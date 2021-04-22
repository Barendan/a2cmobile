using System;
using A2CMobile.Api.Infrastructure.Helpers;
using FluentValidation;

namespace A2CMobile.Api.DTO.Request
{
    public class UpdateMemberRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
    }

    public class UpdateMemberRequestValidator : AbstractValidator<UpdateMemberRequest>
    {
        public UpdateMemberRequestValidator()
        {
            RuleFor(o => o.FirstName).NotEmpty();
            RuleFor(o => o.LastName).NotEmpty();
            RuleFor(o => o.Dob)
                .NotEmpty()
                .Must(PropertyValidation.IsValidDateTime)
                .LessThan(DateTime.Today).WithMessage("You cannot enter a birth date in the future.");
        }
    }
}
