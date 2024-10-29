import pygame
import os

pygame.mixer.init()

WIDTH = 700
HEIGHT = 250

VELOCITY = 5

ICON = pygame.image.load(os.path.join('resources/images', 'icon.png'))

GROUND_IMAGE = pygame.image.load(os.path.join('resources/images', 'ground.png'))

DINO_DEFAULT_IMAGE = pygame.image.load(os.path.join('resources/images/dino', 'default.png'))
DINO_DEAD_IMAGE = pygame.image.load(os.path.join('resources/images/dino', 'dead.png'))
DINO_RUNNING_IMAGES = [
    pygame.image.load(os.path.join('resources/images/dino/running', f'{i}.png')) for i in range(2)
]
DINO_RUNNING_DOWN_IMAGES = [
    pygame.image.load(os.path.join('resources/images/dino/running_down', f'{i}.png')) for i in range(2)
]
DINO_DOWN_DEAD = pygame.image.load(os.path.join('resources/images/dino', 'down_dead.png'))

CACTUS_IMAGES = [
    pygame.image.load(os.path.join('resources/images/cactus', f'{i}.png')) for i in range(6)
]

PTERO_IMAGES = [
    pygame.image.load(os.path.join('resources/images/ptero', f'{i}.png')) for i in range(2)
]

CLOUD_IMAGE = pygame.image.load(os.path.join('resources/images', 'cloud.png'))

HI_IMAGE = pygame.image.load(os.path.join('resources/images/letters', 'hi.png'))
NUMBER_IMAGES = [
    pygame.image.load(os.path.join('resources/images/numbers', f'{i}.png')) for i in range(10)
]
LETTER_IMAGES = [
    pygame.image.load(os.path.join('resources/images/letters', f'{letter}.png')) for letter in 'gameover'
]
GAME_OVER_BUTTON_IMAGE = pygame.image.load(os.path.join('resources/images', 'restart_button.png'))

JUMP_SOUND = pygame.mixer.Sound(os.path.join('resources/sounds', 'jump.wav'))
DEATH_SOUND = pygame.mixer.Sound(os.path.join('resources/sounds', 'death.wav'))
POINT_SOUND = pygame.mixer.Sound(os.path.join('resources/sounds', 'point.wav'))
