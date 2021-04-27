using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using A2CMobile.Api.Contracts;
using A2CMobile.Api.Data;
using A2CMobile.Api.Data.Entity;
using A2CMobile.Api.DTO.Request;
using A2CMobile.Api.DTO.Response;
using AutoMapper;
using AutoWrapper.Wrappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace A2CMobile.Api.API.v1
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly ILogger<MembersController> _logger;
        private readonly IMemberManager _memberManager;
        private readonly IMapper _mapper;

        public MembersController(IMemberManager memberManager, IMapper mapper, ILogger<MembersController> logger)
        {
            _memberManager = memberManager;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<MemberQueryResponse>), Status200OK)]
        public async Task<IEnumerable<MemberQueryResponse>> Get()
        {
            var data = await _memberManager.GetAllAsync();
            var members = _mapper.Map<IEnumerable<MemberQueryResponse>>(data);

            return members;
        }

        [Route("paged")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<MemberQueryResponse>), Status200OK)]
        public async Task<IEnumerable<MemberQueryResponse>> Get([FromQuery] UrlQueryParameters urlQueryParameters)
        {
            var data = await _memberManager.GetMembersAsync(urlQueryParameters);
            var members = _mapper.Map<IEnumerable<MemberQueryResponse>>(data.Members);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(data.Pagination));

            return members;
        }

        [Route("{id:long}")]
        [HttpGet]
        [ProducesResponseType(typeof(MemberQueryResponse), Status200OK)]
        [ProducesResponseType(typeof(MemberQueryResponse), Status404NotFound)]
        public async Task<MemberQueryResponse> Get(long id)
        {
            var member = await _memberManager.GetByIdAsync(id);
            return member != null
                ? _mapper.Map<MemberQueryResponse>(member)
                : throw new ApiProblemDetailsException($"Record with id: {id} does not exist.", Status404NotFound);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse), Status201Created)]
        [ProducesResponseType(typeof(ApiResponse), Status422UnprocessableEntity)]
        public async Task<ApiResponse> Post([FromBody] CreateMemberRequest createRequest)
        {
            if (!ModelState.IsValid)
            { throw new ApiProblemDetailsException(ModelState); }

            var member = _mapper.Map<Member>(createRequest);
            return new ApiResponse("Record successfully created.", await _memberManager.CreateAsync(member), Status201Created);
        }

        [Route("{id:long}")]
        [HttpPut]
        [ProducesResponseType(typeof(ApiResponse), Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse), Status422UnprocessableEntity)]
        public async Task<ApiResponse> Put(long id, [FromBody] UpdateMemberRequest updateRequest)
        {
            if (!ModelState.IsValid)
            { throw new ApiProblemDetailsException(ModelState); }

            var member = _mapper.Map<Member>(updateRequest);
            member.Id = id;

            if (await _memberManager.UpdateAsync(member))
            {
                return new ApiResponse($"Record with Id: {id} sucessfully updated.", true);
            }
            else
            {
                throw new ApiProblemDetailsException($"Record with Id: {id} does not exist.", Status404NotFound);
            }
        }

        [Route("{id:long}")]
        [HttpDelete]
        [ProducesResponseType(typeof(ApiResponse), Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), Status404NotFound)]
        public async Task<ApiResponse> Delete(long id)
        {
            if (await _memberManager.DeleteAsync(id))
            {
                return new ApiResponse($"Record with Id: {id} sucessfully deleted.", true);
            }
            else
            {
                throw new ApiProblemDetailsException($"Record with id: {id} does not exist.", Status404NotFound);
            }
        }
    }
}
