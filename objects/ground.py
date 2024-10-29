from settings import *

class Ground:
    def __init__(self, game):
        self.game = game
        self.x_0 = 0
        self.x_1 = GROUND_IMAGE.get_width()
        self.y = HEIGHT - GROUND_IMAGE.get_height() - 50

    def move(self):
        if self.x_0 + GROUND_IMAGE.get_width() < 0:
            self.x_0 = self.x_1 + GROUND_IMAGE.get_width()
        if self.x_1 + GROUND_IMAGE.get_width() < 0:
            self.x_1 = self.x_0 + GROUND_IMAGE.get_width()

        self.x_0 -= VELOCITY
        self.x_1 -= VELOCITY

    def update(self):
        self.game.screen.blit(GROUND_IMAGE, (self.x_0, self.y))
        self.game.screen.blit(GROUND_IMAGE, (self.x_1, self.y))
