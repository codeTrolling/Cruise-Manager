namespace Backend.Models
{
    public class Cruise
    {
        public int cruiseID { get; set; }
        public string cruiseName { get; set; } = string.Empty;
        public int cruisePrice { get; set; }
        public string setOffLocation { get; set; } = string.Empty;
        public string arriveLocation { get; set; } = string.Empty;
        public string setOffTime { get; set; } = string.Empty;
        public string arriveTime { get; set; } = string.Empty;
        public string captainName { get; set; } = string.Empty;
        public int normalClassTickets { get; set; }
        public int businessClassTickets { get; set; }
        public int normalClassPrice { get; set; }
        public int businessClassPrice { get; set; }

    }
}
