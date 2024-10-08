import highlight_io
from fastapi import FastAPI, HTTPException
from highlight_io.integrations.fastapi import FastAPIMiddleware
import logging

# Initialize Highlight.io SDK with your project credentials
H = highlight_io.H("0dq8zjqd", instrument_logging=True,
                   service_name="python-backend",
                   service_version="1.0.0",
                   environment="development")

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(FastAPIMiddleware)


# A basic route to demonstrate logging
@app.get("/")
async def root():
    logging.info("Root route accessed")
    return {"message": "Welcome to FastAPI with Highlight.io!"}


# A route to demonstrate user session tracking
@app.get("/track_user/{user_id}")
async def track_user(user_id: str):
    logging.info(f"Tracking user session for user_id: {user_id}")
    return {"message": f"User {user_id} tracked"}


# A route to simulate an error for Highlight.io
@app.get("/cause_error")
async def cause_error():
    try:
        # Simulate an error
        1 / 0
    except ZeroDivisionError as e:
        H.record_exception(e)
        raise HTTPException(status_code=500, detail="An error occurred")


# A route to demonstrate performance tracking
@app.get("/process_data")
async def process_data():
    import time
    logging.info("Data processing started")

    # Simulating a long-running process
    time.sleep(3)  # Simulate data processing

    logging.info("Data processing completed")
    return {"message": "Data processing complete"}


# Run the application with Uvicorn (for FastAPI)
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
