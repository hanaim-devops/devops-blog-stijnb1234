using Serilog;

namespace backend_csharp // Correct namespace
{
    class Program
    {
        static void Main(string[] args) // Static Main method, no need to instantiate Program class
        {
            // Set up Serilog Logger with Highlight.io integration and Console sink
            Log.Logger = new LoggerConfiguration()
                .Enrich.WithMachineName() // Enrich logs with machine name
                .Enrich.WithHighlight() // Enrich logs with Highlight.io metadata (optional)
                .Enrich.FromLogContext() // Enrich logs with any contextual data
                .WriteTo.Console() // This enables console output
                .WriteTo.Async(asyncSink => asyncSink.HighlightOpenTelemetry(options =>
                {
                    options.ProjectId = "0dq8zjqd"; // Your Highlight.io project ID
                    options.ServiceName = "csharp-dotnet"; // Service name for your application
                }))
                .CreateLogger();

            try
            {
                // Sample log statements
                Log.Information("Application started");
                throw new Exception("This is a test exception for Highlight.io");
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred");
            }
            finally
            {
                // Make sure to flush the logs before the application exits
                Log.CloseAndFlush();
            }
        }
    }
}