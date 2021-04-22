using System;

namespace A2CMobile.Api.Data.Entity
{
    public class Member : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
    }
}
