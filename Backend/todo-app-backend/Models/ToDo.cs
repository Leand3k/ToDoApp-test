using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

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

        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }

        public bool IsCompleted { get; set; }


    }
}
