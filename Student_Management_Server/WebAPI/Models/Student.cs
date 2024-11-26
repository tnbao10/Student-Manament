namespace WebAPI.Models;

public partial class Student
{
    public int StuId { get; set; }

    public string StuName { get; set; }

    public string StuAddr { get; set; }

    public string StuPhone { get; set; }

    public DateTime StuDob { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
