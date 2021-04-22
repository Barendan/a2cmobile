using A2CMobile.Api.Contracts;
using A2CMobile.Api.DTO.Request;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace A2CMobile.Api.Infrastructure.Installers
{
    internal class RegisterModelValidators : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            //Register DTO Validators
            services.AddTransient<IValidator<CreateMemberRequest>, CreateMemberRequestValidator>();
            services.AddTransient<IValidator<UpdateMemberRequest>, UpdateMemberRequestValidator>();

            //Disable Automatic Model State Validation built-in to ASP.NET Core
            services.Configure<ApiBehaviorOptions>(opt => { opt.SuppressModelStateInvalidFilter = true; });
        }
    }
}
