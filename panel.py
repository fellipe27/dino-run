from settings import *

class Panel:
    def __init__(self, game):
        self.game = game

    def update(self):
        self.game.screen.fill((255, 255, 255))

        self.game.ground.update()

        for cloud in self.game.clouds:
            cloud.update()
        for cactus in self.game.cactus:
            cactus.update()
        for ptero in self.game.pteros:
            ptero.update()

        if self.game.playing or self.game.is_game_over:
            for i, number in enumerate(self.game.score_string[::-1]):
                image = NUMBER_IMAGES[int(number)]
                self.game.screen.blit(image, (WIDTH - 10 - image.get_width() - i * 10, 10))

            if self.game.high_score:
                for i, number in enumerate(self.game.high_score[::-1]):
                    image = NUMBER_IMAGES[int(number)]
                    self.game.screen.blit(image, (WIDTH - 100 - image.get_width() - i * 10, 10))

                    if i == len(self.game.high_score) - 1:
                        self.game.screen.blit(HI_IMAGE, (WIDTH - 130 - image.get_width() - i * 10, 10))

        if self.game.is_game_over:
            for i, letter in enumerate(LETTER_IMAGES):
                space_size = 10 if i < 4 else 15

                self.game.screen.blit(
                    LETTER_IMAGES[i],
                    (
                        WIDTH / 2 - (WIDTH / 7.5) + (letter.get_width() + space_size) * i,
                        HEIGHT / 2 - GAME_OVER_BUTTON_IMAGE.get_height() / 2 - 30
                    )
                )

            self.game.screen.blit(
                GAME_OVER_BUTTON_IMAGE,
                (
                    WIDTH / 2 - GAME_OVER_BUTTON_IMAGE.get_width() / 2,
                    HEIGHT / 2 - GAME_OVER_BUTTON_IMAGE.get_height() / 2
                )
            )

        self.game.dino.update()

        pygame.display.update()
