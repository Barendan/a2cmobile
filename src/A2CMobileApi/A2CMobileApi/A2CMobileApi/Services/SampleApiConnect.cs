using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using A2CMobileApi.Constants;
using A2CMobileApi.Contracts;
using A2CMobileApi.DTO.Request;
using A2CMobileApi.DTO.Response;
using AutoWrapper.Server;
using AutoWrapper.Wrappers;
using Microsoft.Extensions.Logging;

namespace A2CMobileApi.Services
{
    public class SampleApiConnect : IApiConnect
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<SampleApiConnect> _logger;
        public SampleApiConnect(HttpClient httpClient, ILogger<SampleApiConnect> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<SampleResponse> PostDataAsync<SampleResponse, SampleRequest>(string endPoint, SampleRequest dto)
        {
            var content = new StringContent(JsonSerializer.Serialize(dto), Encoding.UTF8, HttpContentMediaTypes.JSON);
            var httpResponse = await _httpClient.PostAsync(endPoint, content);

            if (!httpResponse.IsSuccessStatusCode)
            {
                _logger.Log(LogLevel.Warning, $"[{httpResponse.StatusCode}] An error occured while requesting external api.");
                return default;
            }

            var jsonString = await httpResponse.Content.ReadAsStringAsync();
            var data = Unwrapper.Unwrap<SampleResponse>(jsonString);

            return data;
        }

        public async Task<SampleResponse> GetDataAsync<SampleResponse>(string endPoint)
        {
            var httpResponse = await _httpClient.GetAsync(endPoint);

            if (!httpResponse.IsSuccessStatusCode)
            {
                _logger.Log(LogLevel.Warning, $"[{httpResponse.StatusCode}] An error occured while requesting external api.");
                return default;
            }

            var jsonString = await httpResponse.Content.ReadAsStringAsync();
            var data = Unwrapper.Unwrap<SampleResponse>(jsonString);

            return data;
        }

    }
}
