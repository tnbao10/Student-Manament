using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

public partial class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Course> Courses { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StuId).HasName("PK__Student__91CBC398501E10BB");

            entity.Property(e => e.StuName).HasMaxLength(250);
            entity.Property(e => e.StuAddr).HasMaxLength(250);
            entity.Property(e => e.StuPhone).HasMaxLength(250);

            // Removed HasMaxLength for StuDob because it's a DateTime
            entity.Property(e => e.StuDob);
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourId).HasName("PK__Course__9E5DDB1C09799C81");

            entity.Property(e => e.CourId).HasColumnName("CourId");
            entity.Property(e => e.StuId).HasColumnName("StuId");
            entity.Property(e => e.CourName).HasMaxLength(250);

            // Removed HasMaxLength for CourScore because it's an int
            entity.Property(e => e.CourScore);

            entity.HasOne(d => d.Stu).WithMany(p => p.Courses)
                .HasForeignKey(d => d.StuId)
                .HasConstraintName("FK_Course_Student");  // Corrected the constraint name
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
