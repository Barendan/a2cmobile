using A2CMobileApi.Contracts;
using A2CMobileApi.DTO.Request;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace A2CMobileApi.Infrastructure.Installers
{
    internal class RegisterModelValidators : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            //Register DTO Validators
            services.AddTransient<IValidator<CreatePersonRequest>, CreatePersonRequestValidator>();
            services.AddTransient<IValidator<UpdatePersonRequest>, UpdatePersonRequestValidator>();

            //Disable Automatic Model State Validation built-in to ASP.NET Core
            services.Configure<ApiBehaviorOptions>(opt => { opt.SuppressModelStateInvalidFilter = true; });
        }
    }
}
