from settings import *
from objects.ground import Ground
from objects.dino import Dino
from objects.cloud import Cloud
from objects.cactus import Cactus
from events import Events
from panel import Panel
from objects.ptero import Ptero
import random

class Game:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption('Dino Run')
        pygame.display.set_icon(ICON)
        self.clock = pygame.time.Clock()
        self.ground = Ground(self)
        self.dino = Dino(self)
        self.clouds = [Cloud(self)]
        self.cactus = [Cactus(self)]
        self.pteros = []
        self.events = Events(self)
        self.panel = Panel(self)
        self.playing = False
        self.is_game_over = False
        self.score = 0
        self.score_string = f'{self.score:06}'
        self.high_score = 0

    def game_over(self):
        self.playing = False
        self.is_game_over = True
        DEATH_SOUND.play()

        if self.score > int(self.high_score):
            self.high_score = f'{int(self.score):06}'

    def restart(self):
        self.clouds = [Cloud(self)]
        self.cactus = [Cactus(self)]
        self.pteros = []
        self.dino.y = self.dino.height
        self.score = 0

    def run(self):
        while True:
            self.clock.tick(60)

            if self.playing:
                self.score += 0.25
                self.score_string = f'{int(self.score):06}'

                if self.score % 100 == 0:
                    POINT_SOUND.play()

                self.ground.move()

                for ptero in self.pteros:
                    ptero.move()

                if self.score % 15 == 0:
                    add_cactus = random.choice([True, False])

                    if add_cactus:
                        self.cactus.append(Cactus(self))

                if self.score > 200 and self.score % 15 == 0 and len(self.cactus) > 0 and self.cactus[-1].x < WIDTH / 2:
                    self.pteros.append(Ptero(self))

                if self.clouds[-1].x < WIDTH - WIDTH / 3:
                    self.clouds.append(Cloud(self))

                for ptero in self.pteros[:]:
                    if ptero.x + ptero.image.get_width() < 0:
                        self.pteros.remove(ptero)
                    if self.dino.check_collide(ptero):
                        self.game_over()

                for cactus in self.cactus[:]:
                    if cactus.x + cactus.image.get_width() < 0:
                        self.cactus.remove(cactus)
                    if self.dino.check_collide(cactus):
                        self.game_over()

                    cactus.move()

                for cloud in self.clouds[:]:
                    if cloud.x + cloud.image.get_width() < 0:
                        self.clouds.remove(cloud)

                    cloud.move()

                if self.dino.is_jumping:
                    self.dino.jump()
                else:
                    self.dino.move()

            self.events.check_events()
            self.panel.update()

if __name__ == '__main__':
    Game().run()
