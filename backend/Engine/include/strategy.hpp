#pragma once
<<<<<<< HEAD
#include "MarketSimulator.hpp"
#include <vector>
#include <string>
=======
#include <vector>
#include <string>
#include "MarketSimulator.hpp"
>>>>>>> 9dff4cf (meow)

enum class OperandType {
    CONSTANT,
    SIGNAL
};

struct Condition {
    SignalType lhs;
<<<<<<< HEAD
    char op;                 // '<' or '>'
    OperandType rhs_type;
    SignalType rhs_signal;   // valid if rhs_type == SIGNAL
    double rhs_value;        // valid if rhs_type == CONSTANT
=======
    char op;           // '<', '>', '='
    OperandType rhs_type;
    double rhs_value;  // if CONSTANT
    SignalType rhs_signal; // if SIGNAL
>>>>>>> 9dff4cf (meow)
};

enum class LogicType { AND, OR };

<<<<<<< HEAD
enum class Operator {  // unused so far, future extension
    LT,
    GT
};

=======
enum class Operator{
    LT,
    GT
};
 
>>>>>>> 9dff4cf (meow)
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


