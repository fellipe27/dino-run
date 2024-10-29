from settings import *
import random

class Ptero:
    def __init__(self, game):
        self.game = game
        self.x = WIDTH
        self.y = random.randrange(20, 130)
        self.image_count = 0
        self.image = PTERO_IMAGES[0]

    def move(self):
        self.image_count += VELOCITY / 60
        self.x -= VELOCITY

        if self.image_count >= len(PTERO_IMAGES):
            self.image_count = 0

        self.image = PTERO_IMAGES[int(self.image_count)]

    def get_mask(self):
        return pygame.mask.from_surface(self.image)

    def update(self):
        self.game.screen.blit(self.image, (self.x, self.y))
