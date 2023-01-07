[Service 1(100qps) publisher] ------------> message queue [msg1,msg2,...msg-n] ---------------> [Service 2 (20qps) Subscriber]

If Response needs to be sent

[Service 2 publisher] -----> message queue [msgs] ----> [Service 1 Subscriber]

Advantage
Don't need to downscale service-1
Don't need to upscale service-2
