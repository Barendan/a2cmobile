using System;
using FluentValidation;

namespace A2CMobile.Api.DTO.Request
{
    public class CreateMemberRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
    }

    public class CreateMemberRequestValidator : AbstractValidator<CreateMemberRequest>
    {
        public CreateMemberRequestValidator()
        {
            RuleFor(o => o.FirstName).NotEmpty();
            RuleFor(o => o.LastName).NotEmpty();
            RuleFor(o => o.Dob).NotEmpty();
        }
    }
}
