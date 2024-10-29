from settings import *
import random

class Cactus:
    def __init__(self, game):
        self.game = game
        self.x = WIDTH
        self.image = random.choice(CACTUS_IMAGES)
        self.height = HEIGHT - GROUND_IMAGE.get_height()
        self.y = self.height - 85 if self.image.get_height() > 35 else self.height - (self.image.get_height() * 2)

    def move(self):
        self.x -= VELOCITY

    def get_mask(self):
        return pygame.mask.from_surface(self.image)

    def update(self):
        self.game.screen.blit(self.image, (self.x, self.y))
