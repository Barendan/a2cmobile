using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace A2CMobile.Api.Contracts
{
    public interface IServiceRegistration
    {
        void RegisterAppServices(IServiceCollection services, IConfiguration config);
    }
}
