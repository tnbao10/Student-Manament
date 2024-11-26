using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using WebAPI.Dtos;
using WebAPI.Services;

namespace WebAPI.Controllers;

[Route("api/course")]

public class CourseController : Controller
{
    private CourseService courseService;

    public CourseController(CourseService _courseService)
    {
        courseService = _courseService;
    }

    [Produces("application/json")]
    [HttpGet("findByStuId/{id}")]
    public IActionResult FindByStuId(int id)
    {
        try
        {
            return Ok(courseService.findByStuId(id));
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("finddto/{id}")]
    public IActionResult FindDTO(int id)
    {
        try
        {
            return Ok(courseService.findById(id));
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findAllDTO")]
    public IActionResult FindAllDTO()
    {
        try
        {
            return Ok(courseService.findAllDTO());
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findByKeywordDTO/{keyword}")]
    public IActionResult findByKeywordDTO(string keyword)
    {
        try
        {
            return Ok(courseService.findByKeywordDTO(keyword));
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findByKeywordDTO1/{keyword}/{stuId}")]
    public IActionResult findByKeywordDTO1(string keyword, int stuId)
    {
        try
        {
            return Ok(courseService.findByKeywordDTO1(keyword, stuId));
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findByScore/{score}/{stuId}")]
    public IActionResult findByScore(double score, int stuId)
    {
        try
        {
            return Ok(courseService.findByScore(score, stuId));
        }
        catch
        {
            return BadRequest();
        }
    }

    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("createDTO")]
    public IActionResult CreateDTO(string coursejson)
    {

        var courseDto = JsonConvert.DeserializeObject<CourseDto>(coursejson);

        try
        {
            return Ok(new
            {
                Result = courseService.createDTO(courseDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpDelete("delete/{id}")]
    public IActionResult Delete(int id)
    {
        try
        {
            return Ok(new
            {
                Result = courseService.delete(id)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPut("updateDTO")]
    public IActionResult UpdateDTO(string coursejson)
    {
        var courseDto = JsonConvert.DeserializeObject<CourseDto>(coursejson);
        try
        {
            return Ok(new
            {
                Result = courseService.updateDTO(courseDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
}
