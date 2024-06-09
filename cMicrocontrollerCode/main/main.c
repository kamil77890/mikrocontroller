#include <stdio.h>
#include <string.h>
#include <driver/gpio.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <esp_log.h>
#include <nvs_flash.h>
#include <esp_wifi.h>
#include <esp_event.h>
#include <esp_http_client.h>
#include <esp_netif.h>
#include <lwip/inet.h>
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

void send_ip_to_flask(const char *ip_address)
{
    char url[100];
    sprintf(url, "http://computerIP/register_ip?ip=%s", ip_address); // computer ip

    esp_http_client_config_t config = {
        .url = url,
    };

    esp_http_client_handle_t client = esp_http_client_init(&config);
    esp_http_client_set_method(client, HTTP_METHOD_GET);
    esp_http_client_perform(client);
    esp_http_client_cleanup(client);
}

void wifi_event_handler(void *arg, esp_event_base_t event_base, int32_t event_id, void *event_data)
{
    if (event_id == WIFI_EVENT_STA_START)
    {
        esp_wifi_connect();
    }
    else if (event_id == WIFI_EVENT_STA_DISCONNECTED)
    {
        esp_wifi_connect();
    }
    else if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP)
    {
        ip_event_got_ip_t *event = (ip_event_got_ip_t *)event_data;
        char ip[INET_ADDRSTRLEN];
        inet_ntoa_r(event->ip_info.ip, ip, INET_ADDRSTRLEN);
        ESP_LOGI(TAG, "Got IP: %s", ip);
        send_ip_to_flask(ip);
    }
}

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

    esp_event_handler_instance_t instance_any_id;
    esp_event_handler_instance_t instance_got_ip;
    esp_event_handler_instance_register(WIFI_EVENT, ESP_EVENT_ANY_ID, &wifi_event_handler, NULL, &instance_any_id);
    esp_event_handler_instance_register(IP_EVENT, IP_EVENT_STA_GOT_IP, &wifi_event_handler, NULL, &instance_got_ip);

    wifi_config_t wifi_cfg = {
        .sta = {
            .ssid = "Ja",
            .password = "#####"}};

    esp_wifi_set_mode(WIFI_MODE_STA);
    esp_wifi_set_config(WIFI_IF_STA, &wifi_cfg);
    esp_wifi_start();

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
