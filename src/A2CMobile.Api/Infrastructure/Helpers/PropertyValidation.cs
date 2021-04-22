using System;

namespace A2CMobile.Api.Infrastructure.Helpers
{
    public static class PropertyValidation
    {
        public static bool IsValidDateTime(DateTime date) => date == default ? false : true;
    }
}
