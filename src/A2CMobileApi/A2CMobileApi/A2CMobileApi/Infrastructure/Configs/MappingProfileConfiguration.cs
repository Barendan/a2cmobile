using A2CMobileApi.Data.Entity;
using A2CMobileApi.DTO;
using A2CMobileApi.DTO.Request;
using A2CMobileApi.DTO.Response;
using AutoMapper;

namespace A2CMobileApi.Infrastructure.Configs
{
    public class MappingProfileConfiguration : Profile
    {
        public MappingProfileConfiguration()
        {
            CreateMap<Person, CreatePersonRequest>().ReverseMap();
            CreateMap<Person, UpdatePersonRequest>().ReverseMap();
            CreateMap<Person, PersonQueryResponse>().ReverseMap();
        }
    }
}
