namespace carePlusApi.DTO
{
    namespace carePlusApi.DTO
    {
        public class RoomDto
        {
            public int Id { get; set; }
            public string RoomNumber { get; set; } = string.Empty;
            public int DepartmentId { get; set; }
            public int TotalBeds { get; set; }
            public int AvailableBeds { get; set; }
            public int OccupiedBeds { get; set; }
        }
    }

}
