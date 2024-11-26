

namespace WebAPI.Models;

public partial class Course
{
    public int CourId { get; set; }

    public int StuId { get; set; }

    public string CourName { get; set; }

    public double CourScore { get; set; }

    public virtual Student? Stu { get; set; }
}
