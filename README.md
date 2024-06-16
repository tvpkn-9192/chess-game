## Chess Application Overview

The chess application offers two exciting modes for players:

1. **Play Against a Friend (Local Mode)**:
   - In this mode, users can enjoy a classic game of chess with a friend directly in their browser.
   - The game supports standard rules, including pawn promotion, castling, and en passant.
   - Players can take turns on the same device, making it a great way to challenge friends during a coffee break or study session.

2. **Play Against the Computer (Stockfish Mode)**:
   - The computer mode utilizes the powerful Stockfish chess engine via a REST API.
   - Stockfish is renowned for its strategic prowess and accurate move calculations.
   - Players can test their skills against an AI opponent that adapts to their moves and provides a challenging experience.
   - Features like threefold repetition, pawn promotion, and en passant are also available in this mode.


## Live Demo
Check out the live version of Chess: [Chessgame](https://tvpkn-9192.github.io/chess_game/)


## Technologies Used

This application leverages the following technologies:

1. **Angular 16**:
   - Angular is a popular framework for building dynamic web applications.
   - Version 16 brings enhancements, improved performance, and new features.
   - Angular provides a robust structure for your chess app, making it scalable and maintainable.

2. **Angular Material UI**:
   - Angular Material is a UI component library that follows Material Design principles.
   - It offers pre-built components like buttons, cards, dialogs, and menus.
   - Images for pieces used from Lichess official repo: https://github.com/lichess-org
   - By using Angular Material, your app will have a consistent and visually appealing interface.

3. **Stockfish REST API**:
   - Stockfish is an open-source chess engine known for its strength and accuracy.
   - The REST API allows your application to communicate with Stockfish, enabling computer mode.
   - Users can play against an AI opponent powered by Stockfish's calculations.


## Features

1. **Threefold Repetition Rule**:
   - **Description**: The threefold repetition rule states that if a game reaches the same position three times, a draw can be claimed.
   - **Impact on Gameplay**: It encourages players to seek alternative moves and prevents endless repetition.
   - [Learn more about the Threefold Repetition Rule](https://www.chess.com/terms/threefold-repetition-chess).

2. **Pawn Promotion**:
   - **Description**: When a pawn reaches the eighth rank (for White) or the first rank (for Black), it can be promoted to any other piece (queen, rook, bishop, or knight).
   - **Impact on Gameplay**: Pawn promotion allows players to exchange their pawn for a more powerful piece, potentially altering the game's dynamics.
   - [Learn more about Pawn Promotion](https://www.chess.com/terms/pawn-promotion).

3. **En Passant**:
   - **Description**: En passant is a special pawn capture move. If an opponent's pawn advances two squares from its starting position and lands beside your pawn, you can capture it as if it had moved only one square forward.
   - **Impact on Gameplay**: En passant adds tactical depth and surprises to pawn interactions.
   - [Learn more about En Passant](https://www.chess.com/terms/en-passant).

4. **Castling**:
   - **Description**: Castling is a unique move where the king and a rook are both involved. The king moves two squares toward the rook, and the rook jumps over the king to the adjacent square.
   - **Impact on Gameplay**: Castling provides safety for the king and develops the rook simultaneously.
   - [Learn more about Castling](https://www.chess.com/terms/castling-chess).

5. **Flip Board Feature**:
   - **Description**: The flip board feature allows users to rotate the chessboard, changing the perspective from white's view to black's view and vice versa.
   - **Impact on Gameplay**: Users can explore different angles and visualize the board from both sides.
   - [Explore Flipboard's Basics](https://about.flipboard.com/inside-flipboard/flipboard-101-a-quickstart-guide/).

## Getting Started
To run TodoApp locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/tvpkn-9192/todoapp.git
   ```

2. Navigate to the project directory:
   ```
   cd todoapp
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   ng serve
   ```

5. Open your browser and visit [http://localhost:4200/](http://localhost:4200/)




