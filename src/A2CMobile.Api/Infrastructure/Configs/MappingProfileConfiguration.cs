using A2CMobile.Api.Data.Entity;
using A2CMobile.Api.DTO.Request;
using A2CMobile.Api.DTO.Response;
using AutoMapper;

namespace A2CMobile.Api.Infrastructure.Configs
{
    public class MappingProfileConfiguration : Profile
    {
        public MappingProfileConfiguration()
        {
            CreateMap<Member, CreateMemberRequest>().ReverseMap();
            CreateMap<Member, UpdateMemberRequest>().ReverseMap();
            CreateMap<Member, MemberQueryResponse>().ReverseMap();
        }
    }
}
