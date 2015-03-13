import RPi.GPIO as GPIO
import time

def myprint(arg):
	if arg==18:
		print(4)
	if arg==27:
		print(3)
	if arg==22:
		print(2)
	if arg==23:
		print(1)

GPIO.setmode(GPIO.BCM)

GPIO.setup(18,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(22,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(23,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(27,GPIO.IN, pull_up_down=GPIO.PUD_UP)

GPIO.add_event_detect(18, GPIO.FALLING, callback=myprint, bouncetime=500)
GPIO.add_event_detect(22, GPIO.FALLING, callback=myprint, bouncetime=500)
GPIO.add_event_detect(23, GPIO.FALLING, callback=myprint, bouncetime=500)
GPIO.add_event_detect(27, GPIO.FALLING, callback=myprint, bouncetime=500)

while True:
	time.sleep(1)

GPIO.cleanup()
