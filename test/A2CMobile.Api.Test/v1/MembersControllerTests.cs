using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using A2CMobile.Api.API.v1;
using A2CMobile.Api.Contracts;
using A2CMobile.Api.Data.Entity;
using A2CMobile.Api.DTO.Request;
using A2CMobile.Api.DTO.Response;
using A2CMobile.Api.Infrastructure.Configs;
using AutoMapper;
using AutoWrapper.Wrappers;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace A2CMobile.Api.Test.v1
{
    public class MembersControllerTests
    {
        private readonly Mock<IMemberManager> _mockDataManager;
        private readonly MembersController _controller;

        public MembersControllerTests()
        {
            var logger = Mock.Of<ILogger<MembersController>>();

            var mapperProfile = new MappingProfileConfiguration();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(mapperProfile));
            var mapper = new Mapper(configuration);

            _mockDataManager = new Mock<IMemberManager>();

            _controller = new MembersController(_mockDataManager.Object, mapper, logger);
        }

        private IEnumerable<Member> GetFakeMemberLists()
        {
            return new List<Member>
            {
                new Member()
                {
                    Id = 1,
                    FirstName = "Vynn Markus",
                    LastName = "Durano",
                    Dob = Convert.ToDateTime("01/15/2016")
                },
                new Member()
                {
                    Id = 2,
                    FirstName = "Vianne Maverich",
                    LastName = "Durano",
                    Dob = Convert.ToDateTime("02/15/2016")
                }
            };
        }

        private CreateMemberRequest FakeCreateRequestObject()
        {
            return new CreateMemberRequest()
            {
                FirstName = "Vinz",
                LastName = "Durano",
                Dob = Convert.ToDateTime("02/15/2016")
            };
        }

        private UpdateMemberRequest FakeUpdateRequestObject()
        {
            return new UpdateMemberRequest()
            {
                FirstName = "Vinz",
                LastName = "Durano",
                Dob = Convert.ToDateTime("02/15/2016")
            };
        }

        private CreateMemberRequest FakeCreateRequestObjectWithMissingAttribute()
        {
            return new CreateMemberRequest()
            {
                FirstName = "Vinz",
                LastName = "Durano"
            };
        }

        private CreateMemberRequest FakeUpdateRequestObjectWithMissingAttribute()
        {
            return new CreateMemberRequest()
            {
                FirstName = "Vinz",
                LastName = "Durano"
            };
        }

        [Fact]
        public async Task GET_All_RETURNS_OK()
        {
            // Arrange
            _mockDataManager.Setup(manager => manager.GetAllAsync())
               .ReturnsAsync(GetFakeMemberLists());

            // Act
            var result = await _controller.Get();

            // Assert
            var members = Assert.IsType<List<MemberQueryResponse>>(result);
            Assert.Equal(2, members.Count);
        }

        [Fact]
        public async Task GET_ById_RETURNS_OK()
        {
            long id = 1;

            _mockDataManager.Setup(manager => manager.GetByIdAsync(id))
               .ReturnsAsync(GetFakeMemberLists().Single(p => p.Id.Equals(id)));

            var member = await _controller.Get(id);
            Assert.IsType<MemberQueryResponse>(member);
        }

        [Fact]
        public async Task GET_ById_RETURNS_NOTFOUND()
        {
            var apiException = await Assert.ThrowsAsync<ApiProblemDetailsException>(() => _controller.Get(10));
            Assert.Equal(404, apiException.StatusCode);
        }

        [Fact]
        public async Task POST_Create_RETURNS_BADREQUEST()
        {
            _controller.ModelState.AddModelError("Dob", "Required");

            var apiException = await Assert.ThrowsAsync<ApiProblemDetailsException>(() => _controller.Post(FakeCreateRequestObjectWithMissingAttribute()));
            Assert.Equal(422, apiException.StatusCode);
        }

        [Fact]
        public async Task POST_Create_RETURNS_OK()
        {
            _mockDataManager.Setup(manager => manager.CreateAsync(It.IsAny<Member>()))
                .ReturnsAsync(It.IsAny<long>());

            var member = await _controller.Post(FakeCreateRequestObject());

            var response = Assert.IsType<ApiResponse>(member);
            Assert.Equal(201, response.StatusCode);
        }

        [Fact]
        public async Task POST_Create_RETURNS_SERVERERROR()
        {
            _mockDataManager.Setup(manager => manager.CreateAsync(It.IsAny<Member>()))
                .Throws(new Exception());

            await Assert.ThrowsAsync<Exception>(() => _controller.Post(FakeCreateRequestObject()));
        }

        [Fact]
        public async Task PUT_ById_RETURNS_OK()
        {
            _mockDataManager.Setup(manager => manager.UpdateAsync(It.IsAny<Member>()))
                 .ReturnsAsync(true);

            var member = await _controller.Put(1, FakeUpdateRequestObject());

            var response = Assert.IsType<ApiResponse>(member);
            Assert.Equal(200, response.StatusCode);
        }

        [Fact]
        public async Task PUT_ById_RETURNS_NOTFOUND()
        {
            var apiException = await Assert.ThrowsAsync<ApiProblemDetailsException>(() => _controller.Put(10, FakeUpdateRequestObject()));
            Assert.Equal(404, apiException.StatusCode);
        }

        [Fact]
        public async Task PUT_ById_RETURNS_BADREQUEST()
        {
            _controller.ModelState.AddModelError("Dob", "Required");

            var apiException = await Assert.ThrowsAsync<ApiProblemDetailsException>(() => _controller.Put(10, FakeUpdateRequestObject()));
            Assert.Equal(422, apiException.StatusCode);
        }

        [Fact]
        public async Task PUT_ById_RETURNS_SERVERERROR()
        {
            _mockDataManager.Setup(manager => manager.UpdateAsync(It.IsAny<Member>()))
                .Throws(new Exception());

            await Assert.ThrowsAsync<Exception>(() => _controller.Put(10, FakeUpdateRequestObject()));
        }

        [Fact]
        public async Task DELETE_ById_RETURNS_OK()
        {
            long id = 1;

            _mockDataManager.Setup(manager => manager.DeleteAsync(id))
                 .ReturnsAsync(true);

            var result = await _controller.Delete(id);

            var response = Assert.IsType<ApiResponse>(result);
            Assert.Equal(200, response.StatusCode);
        }

        [Fact]
        public async Task DELETE_ById_RETURNS_NOTFOUND()
        {
            var apiException = await Assert.ThrowsAsync<ApiProblemDetailsException>(() => _controller.Delete(1));
            Assert.Equal(404, apiException.StatusCode);
        }

        [Fact]
        public async Task DELETE_ById_RETURNS_SERVERERROR()
        {
            long id = 1;

            _mockDataManager.Setup(manager => manager.DeleteAsync(id))
                .Throws(new Exception());

            await Assert.ThrowsAsync<Exception>(() => _controller.Delete(id));
        }
    }
}
