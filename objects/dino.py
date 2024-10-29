from settings import *

class Dino:
    def __init__(self, game):
        self.game = game
        self.x = 50
        self.y = HEIGHT - GROUND_IMAGE.get_height() - 80
        self.height = self.y
        self.image_count = 0
        self.image = DINO_DEFAULT_IMAGE
        self.is_down = False
        self.is_jumping = False
        self.is_falling = False
        self.max_jump_height = 30
        self.jump_velocity = 7.5

    def jump(self):
        self.is_down = False
        self.image = DINO_DEFAULT_IMAGE

        if self.y >= self.max_jump_height and not self.is_falling:
            self.y -= self.jump_velocity
        elif self.y <= self.max_jump_height:
            self.is_falling = True

        if self.is_falling and self.y < self.height:
            self.y += self.jump_velocity
        elif self.y > self.height:
            self.y = self.height
        elif self.y == self.height:
            self.is_falling = False
            self.is_jumping = False

    def move(self):
        self.image_count += VELOCITY / 20

        if self.image_count >= 2:
            self.image_count = 0

        if self.is_down:
            self.y = self.height + (DINO_DEFAULT_IMAGE.get_height() - DINO_RUNNING_DOWN_IMAGES[0].get_height())
            self.image = DINO_RUNNING_DOWN_IMAGES[int(self.image_count)]
        else:
            self.y = self.height
            self.image = DINO_RUNNING_IMAGES[int(self.image_count)]

    def check_collide(self, enemy):
        enemy_mask = enemy.get_mask()
        dino_mask = pygame.mask.from_surface(self.image)

        distance = (self.x - enemy.x, self.y - round(enemy.y))
        point = enemy_mask.overlap(dino_mask, distance)

        return point

    def update(self):
        if self.game.is_game_over:
            if self.is_down:
                self.image = DINO_DOWN_DEAD
            else:
                self.image = DINO_DEAD_IMAGE

        self.game.screen.blit(self.image, (self.x, self.y))
