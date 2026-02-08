#pragma once
<<<<<<< HEAD
<<<<<<< HEAD
#include "MarketSimulator.hpp"
#include <vector>
#include <string>
=======
#include <vector>
#include <string>
#include "MarketSimulator.hpp"
>>>>>>> 9dff4cf (meow)
=======
#include <vector>
#include <string>
#include "MarketSimulator.hpp"
>>>>>>> 10bb505 (serious meow)

enum class OperandType {
    CONSTANT,
    SIGNAL
};

struct Condition {
    SignalType lhs;
<<<<<<< HEAD
<<<<<<< HEAD
    char op;                 // '<' or '>'
    OperandType rhs_type;
    SignalType rhs_signal;   // valid if rhs_type == SIGNAL
    double rhs_value;        // valid if rhs_type == CONSTANT
=======
=======
>>>>>>> 10bb505 (serious meow)
    char op;           // '<', '>', '='
    OperandType rhs_type;
    double rhs_value;  // if CONSTANT
    SignalType rhs_signal; // if SIGNAL
<<<<<<< HEAD
>>>>>>> 9dff4cf (meow)
=======
>>>>>>> 10bb505 (serious meow)
};

enum class LogicType { AND, OR };

<<<<<<< HEAD
<<<<<<< HEAD
enum class Operator {  // unused so far, future extension
    LT,
    GT
};

=======
=======
>>>>>>> 10bb505 (serious meow)
enum class Operator{
    LT,
    GT
};
 
<<<<<<< HEAD
>>>>>>> 9dff4cf (meow)
=======
>>>>>>> 10bb505 (serious meow)
struct Strategy {
    std::string name;
    LogicType buy_logic = LogicType::AND;
    LogicType sell_logic = LogicType::AND;
    std::vector<Condition> buy;
    std::vector<Condition> sell;
    bool isValid(const MarketSimulator& sim) const;
};

struct StrategyState {
    bool position_open = false;
    double entry_price = 0.0;
    double pnl = 0.0;
};


