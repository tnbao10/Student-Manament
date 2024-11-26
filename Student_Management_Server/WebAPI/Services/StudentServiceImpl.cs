using AutoMapper;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Services;

public class StudentServiceImpl : StudentService
{
    private DatabaseContext db;
    private IMapper mapper;
    public StudentServiceImpl(DatabaseContext _db, IMapper _mapper)
    {
        db = _db;
        mapper = _mapper;
    }

    public bool createDTO(StudentDto studentDto)
    {
        try
        {
            var student = mapper.Map<Student>(studentDto);
            db.Students.Add(student);
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public bool delete(int id)
    {
        try
        {
            db.Students.Remove(db.Students.Find(id));
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public bool updateDTO(StudentDto studentDto)
    {
        try
        {
            var student = mapper.Map<Student>(studentDto);
            db.Entry(student).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }


    public List<StudentDto> findAllDTO()
    {
        return mapper.Map<List<StudentDto>>(db.Students.ToList());
    }

    public StudentDto findById(int id)
    {
        return mapper.Map<StudentDto>(db.Students.Find(id));
    }

    public List<StudentDto> findByKeywordDTO(string keyword)
    {
        return mapper.Map<List<StudentDto>>(db.Students.Where(c => c.StuName.Contains(keyword)).ToList());
    }


}
