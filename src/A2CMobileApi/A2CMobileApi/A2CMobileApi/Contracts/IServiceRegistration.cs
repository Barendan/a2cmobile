using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace A2CMobileApi.Contracts
{
    public interface IServiceRegistration
    {
        void RegisterAppServices(IServiceCollection services, IConfiguration configuration);
    }
}
