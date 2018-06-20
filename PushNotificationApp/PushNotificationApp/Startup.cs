using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PushNotificationApp.FakeStorage;
using PushNotificationApp.Models;

namespace PushNotificationApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
            
            // Add Swagger to be able to fully test the API
            services.AddSwaggerGen(s => s.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info()
            {
                Version = "v1",
                Title = "PushNotificationsApp - API",
                Description = "API Documentation with Swagger for PushNotificationsApp"
            }));

            services.Configure<VapidSettings>(Configuration.GetSection("VAPID"));
            services.AddSingleton<IPushSusbscriptions, PushSubscriptions>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(s => s.SwaggerEndpoint("/swagger/v1/swagger.json", "PushNotificationsApp - API"));
        }
    }
}
