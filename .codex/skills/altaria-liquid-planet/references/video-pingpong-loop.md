# Video Ping-Pong Loop

Goal:

Create a seamless loop from an existing generated video without generating new footage.

Use this technique:

original video → reversed video → concat → normal MP4 loop

Important:

Do not reverse playback with JavaScript.
Create a new pre-rendered file and use it as a normal looping video.

Preferred command pattern:

```bash
ffmpeg -y -i public/videos/video-desk-hero.mp4 \
  -filter_complex "[0:v]split=2[f][r];[f]setpts=PTS-STARTPTS[fv];[r]reverse,select='not(eq(n\,0))',setpts=PTS-STARTPTS[rv];[fv][rv]concat=n=2:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -an -movflags +faststart public/videos/video-desk-hero.mp4

Mobile:

ffmpeg -y -i public/videos/video-movil-hero.mp4 \
  -filter_complex "[0:v]split=2[f][r];[f]setpts=PTS-STARTPTS[fv];[r]reverse,select='not(eq(n\,0))',setpts=PTS-STARTPTS[rv];[fv][rv]concat=n=2:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -an -movflags +faststart public/videos/video-movil-hero.mp4

Notes:

reverse creates the backward half.
select='not(eq(n\,0))' removes the duplicated frame at the join point.
-movflags +faststart improves web loading.
Keep videos muted and without audio.