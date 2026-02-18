using carePlusApi.DTO;
using carePlusApi.DTO.carePlusApi.DTO;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

namespace carePlusApi.Repository
{
    public class RoomRepository
    {
        private readonly List<RoomDto> _rooms = new();

        public IEnumerable<RoomDto> GetAll() => _rooms;

        public RoomDto? GetById(int id)
        {
            return _rooms.FirstOrDefault(r => r.Id == id);
        }

        public IEnumerable<RoomDto> GetByDepartment(int departmentId)
        {
            return _rooms.Where(r => r.DepartmentId == departmentId);
        }

        public RoomDto Add(RoomDto room)
        {
            room.Id = _rooms.Count > 0 ? _rooms.Max(r => r.Id) + 1 : 1;
            _rooms.Add(room);
            return room;
        }

        public bool Update(int id, RoomDto updatedRoom)
        {
            var existing = GetById(id);
            if (existing == null) return false;

            existing.RoomNumber = updatedRoom.RoomNumber;
            existing.DepartmentId = updatedRoom.DepartmentId;
            existing.TotalBeds = updatedRoom.TotalBeds;
            existing.AvailableBeds = updatedRoom.AvailableBeds;
            existing.OccupiedBeds = updatedRoom.OccupiedBeds;

            return true;
        }

        public bool Delete(int id)
        {
            var room = GetById(id);
            if (room == null) return false;

            _rooms.Remove(room);
            return true;
        }
    }
}
