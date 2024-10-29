from settings import *
import pygame
import sys

class Events:
    def __init__(self, game):
        self.game = game

    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_m:
                    print(f'y: {self.game.dino.y}, height: {self.game.dino.height}')

                if event.key == pygame.K_SPACE or event.key == pygame.K_UP:
                    if self.game.playing and not self.game.dino.is_jumping:
                        self.game.dino.is_jumping = True
                        JUMP_SOUND.play()
                    elif not self.game.playing:
                        self.game.playing = True
                        self.game.dino.is_jumping = True
                        JUMP_SOUND.play()

                    if self.game.is_game_over:
                        self.game.is_game_over = False
                        self.game.dino.is_down = False
                        self.game.restart()
                if event.key == pygame.K_DOWN and not self.game.dino.is_jumping and self.game.playing:
                    self.game.dino.is_down = True

            if (
                    event.type == pygame.KEYUP
                    and event.key == pygame.K_DOWN
                    and not self.game.dino.is_jumping
                    and self.game.playing
            ):
                self.game.dino.is_down = False
