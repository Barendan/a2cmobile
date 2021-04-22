using System;

namespace A2CMobile.Api.Data.Entity
{
    public class EntityBase
    {
        public long Id { get; set; }
        public long CreatedBy { get; set; }
        public long ModifiedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
