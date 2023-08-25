import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TicTacToeController {

    private TicTacToe game;

    public TicTacToeController() {
        game = new TicTacToe();
    }

    @GetMapping("/board")
    public char[][] getBoard() {
        return game.getBoard();
    }

    @PostMapping("/move")
    public String makeMove(@RequestParam int row, @RequestParam int col) {
        boolean success = game.makeMove(row, col);
        if (!success) {
            return "Invalid move";
        }
        
        char winner = game.checkWinner();
        if (winner == '-') {
            return "Success";
        } else if (winner == 'D') {
            return "Draw";
        } else {
            return winner + " wins";
        }
    }
}
