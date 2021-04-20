using System;

namespace A2CMobileApi.Infrastructure.Helpers
{
    public static class PropertyValidation
    {
        public static bool IsValidDateTime(DateTime date) => date == default ? false : true;
    }
}
