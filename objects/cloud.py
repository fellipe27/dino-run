from settings import *
import random

class Cloud:
    def __init__(self, game):
        self.game = game
        self.x = WIDTH
        self.y = random.randrange(20, 120)
        self.image = CLOUD_IMAGE
        self.velocity = VELOCITY / 3

    def move(self):
        self.x -= self.velocity

    def update(self):
        self.game.screen.blit(self.image, (self.x, self.y))
