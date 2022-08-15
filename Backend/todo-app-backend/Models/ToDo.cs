using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using FluentValidation;
using System.ComponentModel;

namespace todo_app_backend.Models
{
    public class DbsetupContext : DbContext
    {
        public DbSet<ToDo> ToDo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("data source=DESKTOP-I6NT15H;initial catalog=ToDoApp;trusted_connection=true");
        }
    }

    public class ToDo
    {
        public int ToDoID { get; set; }

        public string? Name { get; set; }

        public string DateBegin { get; set; }
        public string DateEnd { get; set; }

        [DefaultValue(false)]
        public bool IsCompleted { get; set; } = false;


    }

    public class ToDoValidator : AbstractValidator<ToDo>
    {
        public ToDoValidator()
        {
            RuleFor(todo => todo.Name).NotNull().NotEmpty();
        }
    }
}
