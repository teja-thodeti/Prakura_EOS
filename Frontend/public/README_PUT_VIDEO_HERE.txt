Your Login.jsx and Register.jsx pages reference a background video at "/y.mp4".

That file (y.mp4) was not included in your upload, so it's not here yet.
Drop your video file in this "public" folder and name it y.mp4:

  memento/public/y.mp4

Vite serves everything in /public at the site root, so it will then be
reachable at /y.mp4 exactly as the code expects. You can delete this note
once you've added the file.
