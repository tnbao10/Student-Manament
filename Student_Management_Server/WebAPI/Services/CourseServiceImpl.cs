using AutoMapper;
using System;
using WebAPI.Dtos;
using WebAPI.Models;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace WebAPI.Services;

public class CourseServiceImpl : CourseService
{
    private DatabaseContext db;
    private IMapper mapper;
    private IConfiguration _configuration;

    public CourseServiceImpl(DatabaseContext _db, IMapper _mapper, IConfiguration configuration)
    {
        db = _db;
        mapper = _mapper;
        configuration = _configuration;
    }

    public bool createDTO(CourseDto courseDto)
    {
        try
        {
            var course = mapper.Map<Course>(courseDto);
            db.Courses.Add(course);
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
            db.Courses.Remove(db.Courses.Find(id));
            return db.SaveChanges() > 0;
        } 
        catch
        {
            return false;
        }
    }

    public bool updateDTO(CourseDto courseDto)
    {
        try
        {
            var course = mapper.Map<Course>(courseDto);
            db.Entry(course).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }


    public List<CourseDto> findAllDTO()
    {
        return mapper.Map<List<CourseDto>>(db.Courses.ToList());
    }

    public CourseDto findById(int id)
    {
        return mapper.Map<CourseDto>(db.Courses.Find(id));
    }

    public List<CourseDto> findByStuId(int stuId)
    {
        return mapper.Map<List<CourseDto>>(db.Courses.Where(c => c.StuId == stuId)).ToList();
    }

    public List<CourseDto> findByKeywordDTO(string keyword)
    {
        return mapper.Map<List<CourseDto>>(db.Courses.Where(c => c.CourName.Contains(keyword)).ToList());
    }

    public List<CourseDto> findByKeywordDTO1(string keyword, int stuId)
    {
        return mapper.Map<List<CourseDto>>(
            db.Courses.Where(c => c.CourName.Contains(keyword) && c.StuId == stuId).ToList()
        );
    }

    public List<CourseDto> findByScore(double score, int stuId)
    {
        return mapper.Map<List<CourseDto>>(
           db.Courses.Where(c => c.CourScore == score && c.StuId == stuId).ToList()
       );
    }
}
