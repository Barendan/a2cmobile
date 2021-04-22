using System;

namespace A2CMobile.Api.DTO.Response
{
    public class MemberQueryResponse
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string FullName => $"{FirstName} {LastName}";
    }
}
