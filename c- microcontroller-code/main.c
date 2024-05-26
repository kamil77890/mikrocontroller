#include <stdio.h>
#include <driver/gpio.h>
#include <freertos/FreeRTOS.h>
#include <esp_log.h>
#include <nvs_flash.h>
#include <esp_wifi.h>
#include <time.h>
#include <esp_http_server.h>

static const char *TAG = "MAIN";

bool is_turned_on = false;
time_t startup_time;

esp_err_t root_handler(httpd_req_t *request)
{
    httpd_resp_set_type(request, "application/json");
    char napis[100];
    time_t current_time;
    time(&current_time);
    sprintf(napis, "{\"status\": %s, \"time\": %ld}", is_turned_on ? "true" : "false", (long int)current_time);
    httpd_resp_sendstr(request, napis);
    return ESP_OK;
}

esp_err_t turn_off_handler(httpd_req_t *request)
{
    gpio_set_level(GPIO_NUM_2, 0);
    is_turned_on = false;
    httpd_resp_set_type(request, "application/json");
    char napis[100];
    time_t seconds;

    time(&seconds);
    sprintf(napis, "{\"status\": %s, \"time\": %ld}", is_turned_on ? "true" : "false", (long int)seconds);
    httpd_resp_sendstr(request, napis);
    return ESP_OK;
}

esp_err_t turn_on_handler(httpd_req_t *request)
{
    gpio_set_level(GPIO_NUM_2, 1);
    is_turned_on = true;
    httpd_resp_set_type(request, "application/json");
    char napis[100];
    time_t seconds;

    time(&seconds);
    sprintf(napis, "{\"status\": %s, \"time\": %ld}", is_turned_on ? "true" : "false", (long int)seconds);
    httpd_resp_sendstr(request, napis);
    return ESP_OK;
}

httpd_uri_t uri_handler = {
    .method = HTTP_GET,
    .uri = "/",
    .handler = root_handler};

httpd_uri_t handler_1 = {
    .method = HTTP_GET,
    .uri = "/turn_off",
    .handler = turn_off_handler};

httpd_uri_t handler_2 = {
    .method = HTTP_GET,
    .uri = "/turn_on",
    .handler = turn_on_handler};

void app_main(void)
{
    gpio_set_direction(GPIO_NUM_2, GPIO_MODE_OUTPUT);
    esp_log_level_set(TAG, ESP_LOG_DEBUG);

    nvs_flash_init();

    esp_netif_init();
    esp_event_loop_create_default();
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t wifi_init_cfg = WIFI_INIT_CONFIG_DEFAULT();
    esp_wifi_init(&wifi_init_cfg);

    wifi_config_t wifi_cfg = {
        .sta = {
            .ssid = "Ja",
            .password = "12klatkA"}};

    esp_wifi_set_mode(WIFI_MODE_STA);
    esp_wifi_set_config(WIFI_IF_STA, &wifi_cfg);
    esp_wifi_start();

    esp_wifi_connect();

    startup_time = time(NULL);

    httpd_config_t httpd_cfg = HTTPD_DEFAULT_CONFIG();
    httpd_handle_t httpd_handle;

    httpd_start(&httpd_handle, &httpd_cfg);

    httpd_register_uri_handler(httpd_handle, &uri_handler);
    httpd_register_uri_handler(httpd_handle, &handler_1);
    httpd_register_uri_handler(httpd_handle, &handler_2);

    while (1)
    {
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}
