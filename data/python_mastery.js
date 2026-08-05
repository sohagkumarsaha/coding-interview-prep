// Python Mastery — a Q&A-driven curriculum, Hello World through Google-level,
// for interview conceptual questions (not coding challenges). Each item has
// a concise answer, an example where it clarifies, and short follow-ups,
// mirroring how this actually gets asked in an interview.
const PYTHON_MASTERY = [
  {
    tier: "1. Hello World & Basics",
    items: [
      {
        q: "How do you print output and take user input in Python?",
        a: "print() writes to stdout; input() reads a line from stdin and always returns a string, so numeric input needs an explicit int()/float() conversion.",
        example: "name = input(\"Name: \")\nprint(f\"Hello, {name}!\")",
        followups: [
          { q: "How do you print without a trailing newline?", a: "Pass end=\"\" to print(), e.g. print(\"hi\", end=\"\")." },
          { q: "How do you separate multiple printed values with something other than a space?", a: "Use the sep argument: print(a, b, sep=\", \")." }
        ]
      },
      {
        q: "What are Python's built-in numeric types, and how do int and float differ?",
        a: "int is arbitrary-precision (no overflow); float is a 64-bit double with the usual binary floating-point rounding behavior. complex covers imaginary numbers.",
        example: "print(2 ** 100)      # exact, arbitrary precision\nprint(0.1 + 0.2)     # 0.30000000000000004",
        followups: [
          { q: "Why doesn't 0.1 + 0.2 equal 0.3 exactly?", a: "Binary floating point can't represent most decimal fractions exactly; use decimal.Decimal or round() when exactness matters." },
          { q: "How do you do integer (floor) division?", a: "The // operator: 7 // 2 == 3." }
        ]
      },
      {
        q: "What's the difference between == and is?",
        a: "== compares values for equality (overridable via __eq__); is compares object identity — whether it's literally the same object in memory.",
        example: "a = [1, 2]\nb = [1, 2]\na == b   # True, same value\na is b   # False, different objects",
        followups: [
          { q: "Why does `a is b` sometimes return True for small integers or short strings?", a: "CPython caches/interns small ints (-5 to 256) and some short strings, so identical small values can share one object. It's an implementation detail, not a guarantee." },
          { q: "When should you use is instead of ==?", a: "Almost only for None checks — if x is None — since None is a singleton." }
        ]
      },
      {
        q: "What are Python's core control flow structures?",
        a: "if/elif/else for branching; for loops (iterate any iterable); while loops (condition-based); both loop types support break/continue and an else clause.",
        example: "for i in range(5):\n    if i == 3:\n        break\nelse:\n    print(\"completed without break\")",
        followups: [
          { q: "What does a for/else or while/else actually do?", a: "The else block runs only if the loop finishes without hitting a break — handy for 'search and not found' patterns." },
          { q: "Does Python have a switch/case statement?", a: "Not until 3.10's match statement, which is structural pattern matching — closer to destructuring than a classic switch." }
        ]
      },
      {
        q: "What's an f-string and why prefer it over .format() or % formatting?",
        a: "An f-string (f\"...\") evaluates expressions directly inside the string literal at runtime; it's generally faster and more readable since the variable sits right where it's used.",
        example: "name, age = \"Ada\", 30\nprint(f\"{name} is {age}, next year {age + 1}\")",
        followups: [
          { q: "Can f-strings format numbers, like 2 decimal places?", a: "Yes: f\"{value:.2f}\"." },
          { q: "When would you still use .format()?", a: "When the template string is defined separately from where the values are known, e.g. loaded from a config or translation file." }
        ]
      },
      {
        q: "What are Python's basic built-in data types?",
        a: "Scalars: int, float, bool, str, None. Containers: list, tuple, dict, set. Everything is an object, including these.",
        example: null,
        followups: [
          { q: "Is bool a subtype of int?", a: "Yes — True == 1 and False == 0 both hold, and bool is literally a subclass of int in CPython." }
        ]
      },
      {
        q: "What's the difference between a comment and a docstring?",
        a: "A comment (#) is stripped at parse time and invisible to the running program. A docstring — a string literal as the first statement in a module/function/class — is stored as __doc__ and readable at runtime via help() or introspection.",
        example: "def add(a, b):\n    \"\"\"Return the sum of a and b.\"\"\"\n    return a + b\nprint(add.__doc__)",
        followups: []
      },
      {
        q: "What does the range() function actually return?",
        a: "A lazy, memory-efficient range object that generates values on demand — not a list. It supports len() and indexing without ever materializing all its values.",
        example: null,
        followups: [
          { q: "How do you get an actual list from it?", a: "list(range(10))." }
        ]
      }
    ]
  },
  {
    tier: "2. Core Data Structures",
    items: [
      {
        q: "What's the difference between a list, a tuple, and a dictionary?",
        a: "A list is ordered and mutable — good for a collection you'll modify. A tuple is ordered and immutable — good for a fixed grouping of values, and hashable enough to use as a dict key. A dict maps keys to values (insertion-ordered since 3.7) — good for lookup by key rather than position.",
        example: "fruits = [\"apple\", \"banana\"]     # list: mutable, ordered\npoint = (3, 4)                     # tuple: immutable, ordered\nages = {\"alice\": 30, \"bob\": 25}   # dict: key -> value\nfruits.append(\"cherry\")            # OK\n# point[0] = 5                     # TypeError: tuples are immutable\nprint(ages[\"alice\"])               # 30, lookup by key",
        followups: [
          { q: "Why choose a tuple over a list?", a: "Immutability (safety against accidental changes), it's hashable (usable as a dict key or set element), and it signals a fixed-shape record rather than a growable collection." },
          { q: "What's a set, and how does it relate to a dict?", a: "An unordered collection of unique, hashable elements — essentially a dict with only keys, sharing the same average O(1) lookup." }
        ]
      },
      {
        q: "What does 'mutable' mean, and which built-in types are mutable vs immutable?",
        a: "Mutable objects can change in place after creation (their id() stays the same); immutable ones can't. list, dict, set are mutable. int, float, str, tuple, frozenset are immutable.",
        example: "s = \"hello\"\ns += \" world\"   # creates a NEW string object; doesn't mutate the old one",
        followups: [
          { q: "Why does this matter for function arguments?", a: "Passing a mutable object lets the function modify the caller's object in place; passing an immutable one never does, no matter what the function does to its local name." }
        ]
      },
      {
        q: "How does Python list slicing work?",
        a: "seq[start:stop:step], all three optional. Negative indices count from the end, and slicing never raises IndexError even out of range — it just clips.",
        example: "nums = [0,1,2,3,4,5]\nnums[1:4]     # [1, 2, 3]\nnums[::-1]    # [5, 4, 3, 2, 1, 0]\nnums[:3]      # [0, 1, 2]",
        followups: [
          { q: "Does slicing return a new list or a view?", a: "A new (shallow) copy — unlike NumPy arrays, where slicing returns a view into the same buffer." }
        ]
      },
      {
        q: "What's a list comprehension, and how does it compare to a for loop?",
        a: "A concise, single-expression way to build a list: [expr for item in iterable if condition]. Generally faster than an equivalent for loop with .append(), since the looping happens in C internally.",
        example: "squares = [x*x for x in range(10) if x % 2 == 0]",
        followups: [
          { q: "What's a dict comprehension?", a: "The same idea for dicts: {k: v for k, v in pairs}." },
          { q: "When should you not use a comprehension?", a: "When the logic is complex enough that it hurts readability — a plain loop with clear variable names wins at that point." }
        ]
      },
      {
        q: "What do *args and **kwargs mean in a function signature?",
        a: "*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict, letting a function accept a variable number of arguments.",
        example: "def f(*args, **kwargs):\n    print(args, kwargs)\nf(1, 2, x=3)   # (1, 2) {'x': 3}",
        followups: [
          { q: "Can you use them to forward arguments to another function?", a: "Yes: def wrapper(*args, **kwargs): return inner(*args, **kwargs) is a very common pattern." }
        ]
      },
      {
        q: "What's the difference between a shallow copy and a deep copy?",
        a: "A shallow copy (x.copy(), list(x), copy.copy(x)) duplicates the outer container but keeps references to the same nested objects. A deep copy (copy.deepcopy(x)) recursively duplicates everything.",
        example: "import copy\na = [[1, 2], [3, 4]]\nb = a.copy()\nb[0].append(99)\nprint(a)   # [[1, 2, 99], [3, 4]] -- nested list was shared!\nc = copy.deepcopy(a)",
        followups: [
          { q: "Does slicing a list count as shallow or deep?", a: "Shallow — the same nested-object-sharing caveat applies." }
        ]
      },
      {
        q: "How do you unpack values in Python?",
        a: "Assign multiple names at once from an iterable, including a star target to grab the rest.",
        example: "a, b, c = [1, 2, 3]\nfirst, *rest = [1, 2, 3, 4]   # first=1, rest=[2,3,4]\nx, (y, z) = (1, (2, 3))         # nested unpacking",
        followups: []
      },
      {
        q: "Why is string concatenation with + in a loop considered bad practice?",
        a: "Strings are immutable, so each += creates a new string and copies everything so far — a naive loop is O(n^2) overall. Building a list and calling \"\".join(list) at the end is O(n).",
        example: "# slow: parts = \"\"; for p in items: parts += p\nparts = \"\".join(items)   # fast",
        followups: []
      },
      {
        q: "What does the `in` operator's time complexity depend on?",
        a: "O(n) for list/tuple (linear scan) but O(1) average for set/dict (hash lookup) — exactly why you convert a list to a set before doing many membership checks against it.",
        example: "lookup = set(big_list)\nif x in lookup:   # O(1) average, vs O(n) directly on big_list\n    ...",
        followups: []
      }
    ]
  },
  {
    tier: "3. Functions & Scope",
    items: [
      {
        q: "Why is a mutable default argument a classic Python bug?",
        a: "Default values are evaluated once, at function definition time, not on every call — a mutable default (like a list) is shared and accumulates state across unrelated calls.",
        example: "def append_to(item, target=[]):   # BUG\n    target.append(item)\n    return target\nappend_to(1)   # [1]\nappend_to(2)   # [1, 2]  -- surprise, same list!",
        followups: [
          { q: "What's the fix?", a: "Use None as the default and create the mutable object inside the function body: def append_to(item, target=None): target = target if target is not None else []." }
        ]
      },
      {
        q: "What is a closure?",
        a: "A function that captures and remembers variables from its enclosing scope, even after that outer function has returned.",
        example: "def make_counter():\n    count = 0\n    def increment():\n        nonlocal count\n        count += 1\n        return count\n    return increment\ncounter = make_counter()\ncounter()  # 1\ncounter()  # 2",
        followups: [
          { q: "What does nonlocal do here?", a: "Without it, count += 1 inside increment would create a new local variable instead of modifying the enclosing one, raising an UnboundLocalError." }
        ]
      },
      {
        q: "What is Python's LEGB scoping rule?",
        a: "Name lookup checks, in order: Local (current function), Enclosing (any outer function), Global (module level), Built-in (Python's built-ins) — first match wins.",
        example: null,
        followups: [
          { q: "What does the global keyword do inside a function?", a: "Tells Python that an assignment to that name should modify the module-level variable instead of creating a new local one." }
        ]
      },
      {
        q: "What's a lambda, and when would you use one over a regular function?",
        a: "An anonymous, single-expression function: lambda args: expression. Useful for short throwaway functions passed as arguments (like a sort key); a named def is clearer for anything more than a one-liner.",
        example: "pairs = [(1, 'b'), (2, 'a')]\npairs.sort(key=lambda p: p[1])",
        followups: []
      },
      {
        q: "What does functools.lru_cache do, and when is it useful?",
        a: "A decorator that memoizes a function's return values by its arguments, so repeated calls with the same inputs return instantly instead of recomputing. Classic use: recursive algorithms like Fibonacci or DP recurrences.",
        example: "from functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)",
        followups: [
          { q: "What's required of the function's arguments for this to work?", a: "They must be hashable, since the cache is keyed on the argument tuple." }
        ]
      },
      {
        q: "What is a decorator?",
        a: "A function that takes another function (or class) and returns a modified version of it — typically used to add cross-cutting behavior (logging, timing, caching, access control) without changing the original function's code.",
        example: "def timed(func):\n    def wrapper(*args, **kwargs):\n        import time\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(func.__name__, time.time() - start)\n        return result\n    return wrapper\n\n@timed\ndef slow():\n    ...",
        followups: [
          { q: "Why use functools.wraps inside a decorator?", a: "Without it, the wrapped function loses its original __name__ and __doc__, which breaks introspection and debugging." }
        ]
      },
      {
        q: "Is Python 'pass by value' or 'pass by reference'?",
        a: "Neither, strictly — it's 'pass by object reference.' The reference is passed by value, so reassigning the parameter inside the function doesn't affect the caller, but mutating the object it points to does (if it's mutable).",
        example: "def reassign(lst):\n    lst = [9, 9, 9]     # doesn't affect the caller\ndef mutate(lst):\n    lst.append(9)       # does affect the caller",
        followups: []
      },
      {
        q: "What do * and / mean as bare separators in a function signature?",
        a: "A bare * forces everything after it to be passed as a keyword argument; a bare / forces everything before it to be positional-only. Both exist to design clearer, harder-to-misuse APIs.",
        example: "def f(a, b, /, c, *, d):\n    ...\nf(1, 2, 3, d=4)   # OK\n# f(a=1, b=2, c=3, d=4)  # TypeError: a, b are positional-only",
        followups: []
      }
    ]
  },
  {
    tier: "4. Object-Oriented Programming",
    items: [
      {
        q: "What's the difference between an instance attribute and a class attribute?",
        a: "A class attribute is defined on the class itself and shared by all instances (until one shadows it). An instance attribute is set per-object, usually in __init__, and belongs only to that instance.",
        example: "class Dog:\n    species = \"Canis familiaris\"   # class attribute, shared\n    def __init__(self, name):\n        self.name = name             # instance attribute",
        followups: [
          { q: "What's the danger of a mutable class attribute?", a: "The same trap as mutable default arguments — every instance shares and mutates the same object unless explicitly overridden per instance." }
        ]
      },
      {
        q: "What does super() do, and why use it instead of calling the parent class directly?",
        a: "It returns a proxy that delegates to the next class in the Method Resolution Order (MRO), correctly handling multiple/diamond inheritance — calling ParentClass.method(self) directly bypasses that and can call the wrong method, or call it twice.",
        example: "class Animal:\n    def __init__(self, name):\n        self.name = name\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed",
        followups: []
      },
      {
        q: "What do Python's common dunder methods do?",
        a: "They let a custom class integrate with built-in syntax: __init__ (construction), __str__ (readable print output), __repr__ (unambiguous debug representation), __eq__ (== comparison), __len__ (len()), __getitem__ (indexing).",
        example: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f\"Point({self.x}, {self.y})\"\n    def __eq__(self, other):\n        return (self.x, self.y) == (other.x, other.y)",
        followups: [
          { q: "What's the difference between __str__ and __repr__?", a: "__str__ is human-readable display (used by print()/str()); __repr__ is an unambiguous, ideally eval-able representation, used by the REPL and as the fallback if __str__ isn't defined." }
        ]
      },
      {
        q: "What's the difference between a classmethod, a staticmethod, and a regular instance method?",
        a: "An instance method takes self and operates on one instance. A classmethod takes cls instead and operates on the class itself — commonly used for alternate constructors. A staticmethod takes neither; it's just a regular function namespaced inside the class.",
        example: "class Pizza:\n    def __init__(self, toppings):\n        self.toppings = toppings\n    @classmethod\n    def margherita(cls):\n        return cls([\"mozzarella\", \"tomato\"])\n    @staticmethod\n    def is_valid_topping(name):\n        return name in KNOWN_TOPPINGS",
        followups: []
      },
      {
        q: "What does the @property decorator do?",
        a: "Lets a method be accessed like an attribute, with no parentheses — commonly used to add validation or computed values without changing the class's public interface.",
        example: "class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    @property\n    def area(self):\n        return 3.14159 * self._radius ** 2\nc = Circle(2)\nprint(c.area)   # no parentheses",
        followups: [
          { q: "How do you add a setter for a property?", a: "Define another method decorated with @<name>.setter, letting you run validation on assignment too." }
        ]
      },
      {
        q: "What's the Method Resolution Order (MRO), and why does it matter?",
        a: "The order Python searches base classes for an attribute or method, computed via C3 linearization and viewable with ClassName.__mro__. With multiple/diamond inheritance, it determines exactly which parent's implementation super() and attribute lookup will find.",
        example: null,
        followups: [
          { q: "Is multiple inheritance recommended in Python?", a: "It's supported and useful for small, focused mixins, but generally used sparingly — deep multiple inheritance can make control flow hard to trace." }
        ]
      },
      {
        q: "What's the difference between composition and inheritance?",
        a: "Inheritance models an 'is-a' relationship (a Dog is an Animal); composition models a 'has-a' relationship (a Car has an Engine, held as an attribute). Composition is usually preferred for reusing behavior without committing to a rigid class hierarchy.",
        example: "class Engine:\n    def start(self): ...\nclass Car:\n    def __init__(self):\n        self.engine = Engine()   # composition, not inheritance",
        followups: []
      },
      {
        q: "What is an abstract base class, and why use one?",
        a: "A class (via the abc module) that defines a required interface but can't be instantiated directly — subclasses must implement its abstract methods. It documents and enforces a contract at instantiation time, rather than failing later with an AttributeError.",
        example: "from abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): ...",
        followups: []
      },
      {
        q: "What does defining __call__ do, and what's a real use case?",
        a: "It makes instances of the class callable like a function (instance()). Useful for stateful function-like objects — a class-based decorator, or a configurable transformation you can pass around like a callback.",
        example: "class Multiplier:\n    def __init__(self, factor):\n        self.factor = factor\n    def __call__(self, x):\n        return x * self.factor\ndouble = Multiplier(2)\ndouble(5)   # 10",
        followups: []
      }
    ]
  },
  {
    tier: "5. Iterators, Generators & Functional Programming",
    items: [
      {
        q: "What's the iterator protocol?",
        a: "An object is iterable if it defines __iter__ (returning an iterator); an iterator defines both __iter__ (returning itself) and __next__ (returning the next value, raising StopIteration when exhausted). A for loop is really just repeated next() calls under the hood.",
        example: null,
        followups: [
          { q: "What's the difference between an iterable and an iterator?", a: "An iterable can produce a fresh iterator each time (like a list, loopable multiple times); an iterator is a one-shot, already-in-progress traversal that gets exhausted." }
        ]
      },
      {
        q: "What is a generator, and how does yield differ from return?",
        a: "A generator function uses yield instead of return, pausing execution and remembering its state between calls, producing one value at a time instead of building the whole result up front. It's lazy — values are computed only as needed.",
        example: "def count_up_to(n):\n    i = 1\n    while i <= n:\n        yield i\n        i += 1\nfor x in count_up_to(3):\n    print(x)   # 1, 2, 3, one at a time",
        followups: [
          { q: "Why prefer a generator over a full list for large data?", a: "Constant memory usage regardless of how many items are produced, since values aren't all held in memory at once." }
        ]
      },
      {
        q: "What's the difference between a list comprehension and a generator expression?",
        a: "[x for x in y] builds the whole list in memory immediately; (x for x in y) — parentheses instead of brackets — builds a lazy generator producing values on demand. Same syntax, very different memory behavior.",
        example: "total = sum(x*x for x in range(1000000))   # never materializes the full list",
        followups: []
      },
      {
        q: "What do map(), filter(), and functools.reduce() do?",
        a: "map(func, iterable) applies func to every element lazily; filter(pred, iterable) keeps only elements where pred is True; reduce(func, iterable) folds the iterable to a single value by repeatedly applying a binary function.",
        example: "from functools import reduce\nnums = [1, 2, 3, 4]\ndoubled = list(map(lambda x: x*2, nums))\nevens = list(filter(lambda x: x % 2 == 0, nums))\ntotal = reduce(lambda a, b: a + b, nums)",
        followups: [
          { q: "Are these idiomatic in modern Python?", a: "map/filter are often replaced by comprehensions for readability; reduce is kept for genuine folds, but sum()/max()/etc. cover most common cases more directly." }
        ]
      },
      {
        q: "What is a context manager, and what does the with statement do?",
        a: "An object implementing __enter__ and __exit__, used with the with statement to guarantee setup/teardown (like closing a file or releasing a lock) even if an exception occurs inside the block.",
        example: "with open(\"data.txt\") as f:\n    contents = f.read()\n# file is guaranteed closed here, even if read() raised",
        followups: [
          { q: "How do you write a simple context manager without a class?", a: "The @contextmanager decorator from contextlib, wrapping a generator function that yields once — setup before the yield, teardown after." }
        ]
      },
      {
        q: "What are Python's most useful itertools functions?",
        a: "chain (concatenate iterables lazily), combinations/permutations (generate lazily rather than building lists), groupby (group consecutive equal keys), islice (slice an iterator without materializing it), count/cycle/repeat (infinite iterators).",
        example: "from itertools import combinations\nlist(combinations([1,2,3], 2))   # [(1,2), (1,3), (2,3)]",
        followups: []
      },
      {
        q: "What does the walrus operator := do?",
        a: "Assignment as part of an expression (3.8+), letting you assign and use a value in the same line — commonly used to avoid computing something twice in a while-loop condition or comprehension.",
        example: "while (chunk := file.read(1024)):\n    process(chunk)",
        followups: []
      }
    ]
  },
  {
    tier: "6. Memory, Performance & Internals",
    items: [
      {
        q: "What is the GIL, and what does it actually restrict?",
        a: "A mutex in CPython allowing only one thread to execute Python bytecode at a time. It means threading doesn't give true parallelism for CPU-bound Python code, but I/O-bound code still benefits from threads since I/O releases the GIL while waiting.",
        example: null,
        followups: [
          { q: "How do you get real parallelism despite the GIL?", a: "multiprocessing (separate processes, each with its own interpreter and GIL), or offloading to C extensions like NumPy that release the GIL during heavy computation." }
        ]
      },
      {
        q: "How does Python's garbage collection work?",
        a: "Primarily reference counting — an object is freed the instant its refcount hits zero. A supplementary cyclic garbage collector periodically finds and cleans up reference cycles that refcounting alone can't detect.",
        example: null,
        followups: [
          { q: "Can you force garbage collection?", a: "Yes, gc.collect(), though it's rarely necessary — mostly useful when debugging a suspected reference-cycle leak." }
        ]
      },
      {
        q: "What's string interning, and why does Python do it?",
        a: "CPython automatically reuses certain string objects — short identifier-like strings and literals — so identical strings can share one object, saving memory and making is-based equality faster in those cases. It's an implementation detail, not something to rely on for correctness.",
        example: "a = \"hello\"\nb = \"hello\"\na is b   # often True due to interning, but not guaranteed for all strings",
        followups: []
      },
      {
        q: "Roughly how does a Python dict work under the hood?",
        a: "A hash table: each key hashes to find a bucket; collisions are handled via open addressing. This gives average O(1) lookup, insert, and delete, and is exactly why keys must be hashable (consistent __hash__ and __eq__).",
        example: null,
        followups: [
          { q: "Why can't you use a list as a dict key?", a: "Lists don't define __hash__ (since they're mutable, their contents — and thus hash — could change after insertion, which would break the table)." }
        ]
      },
      {
        q: "What's the time complexity of common list operations?",
        a: "Indexing and append: O(1) amortized. insert(0, x) or pop(0): O(n), since every following element shifts. 'in': O(n), linear scan. sort(): O(n log n).",
        example: null,
        followups: [
          { q: "Why is append O(1) 'amortized' rather than strictly O(1)?", a: "Python over-allocates list capacity, so most appends just fill existing space; occasional resizes are O(n) but rare enough that the average stays O(1)." }
        ]
      },
      {
        q: "What are __slots__, and when would you use them?",
        a: "A class attribute that restricts instances to a fixed set of attributes, replacing the default per-instance __dict__ with a compact fixed-size structure — reducing memory and speeding up attribute access. Valuable when creating a very large number of instances of a simple class.",
        example: "class Point:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y):\n        self.x, self.y = x, y",
        followups: [
          { q: "What do you lose by using __slots__?", a: "You can't add arbitrary new attributes at runtime, and it complicates multiple inheritance between slotted classes." }
        ]
      },
      {
        q: "How would you profile slow Python code to find the actual bottleneck?",
        a: "Start broad with cProfile (function-level timing) to find which function dominates, then narrow with line_profiler for line-by-line timing inside that function if needed. Guessing without measuring is usually wrong.",
        example: "python -m cProfile -s cumulative my_script.py",
        followups: []
      }
    ]
  },
  {
    tier: "7. Concurrency & Async",
    items: [
      {
        q: "When should you use threading vs multiprocessing vs asyncio?",
        a: "threading for I/O-bound work that benefits from overlapping wait time (network, file I/O) without needing real CPU parallelism. multiprocessing for CPU-bound work, since separate processes each get their own GIL and real parallel cores. asyncio for very high-concurrency I/O-bound work (thousands of connections) without the memory overhead of that many OS threads.",
        example: null,
        followups: [
          { q: "Why not just always use multiprocessing?", a: "Processes are heavier (more memory, slower startup, no shared memory by default — data must be explicitly serialized between them), overkill for I/O-bound tasks threading/asyncio handle more cheaply." }
        ]
      },
      {
        q: "What's a race condition, and how do you prevent one in Python?",
        a: "When multiple threads read and write shared state without coordination, and the outcome depends on unpredictable timing. Prevented with a threading.Lock (or a higher-level structure like Queue) around the critical section touching shared state.",
        example: "import threading\nlock = threading.Lock()\ncounter = 0\ndef increment():\n    global counter\n    with lock:\n        counter += 1",
        followups: []
      },
      {
        q: "What do async and await actually do?",
        a: "async def defines a coroutine function; await pauses that coroutine at an I/O point, yielding control back to the event loop so it can run other coroutines while waiting, then resumes when the awaited operation completes. It's cooperative concurrency on a single thread, not parallelism.",
        example: "import asyncio\nasync def fetch(url):\n    await asyncio.sleep(1)   # simulates I/O wait\n    return f\"data from {url}\"\nasync def main():\n    results = await asyncio.gather(fetch(\"a\"), fetch(\"b\"))\nasyncio.run(main())",
        followups: [
          { q: "Why is asyncio.gather useful here?", a: "It runs both fetch() calls concurrently rather than sequentially, so the total wait is ~1 second instead of ~2." }
        ]
      },
      {
        q: "What's the difference between ThreadPoolExecutor and ProcessPoolExecutor?",
        a: "Same interface, different execution model: ThreadPoolExecutor runs tasks on threads within one process (good for I/O-bound work, still subject to the GIL for CPU work); ProcessPoolExecutor runs tasks in separate processes (true CPU parallelism, with process-startup and data-transfer overhead).",
        example: "from concurrent.futures import ProcessPoolExecutor\nwith ProcessPoolExecutor() as ex:\n    results = list(ex.map(cpu_heavy_fn, data))",
        followups: []
      },
      {
        q: "Why can queue.Queue be safely shared between threads without extra locking?",
        a: "It has its own internal locking built in specifically for producer/consumer patterns across threads, so you don't need to wrap access to it in your own Lock the way you would for a plain list or dict.",
        example: null,
        followups: []
      }
    ]
  },
  {
    tier: "8. Testing, Tooling & Packaging",
    items: [
      {
        q: "What's the difference between unittest and pytest?",
        a: "unittest is in the standard library, class-based (subclass TestCase, use self.assertEqual). pytest is third-party, uses plain functions and assert statements, with richer fixtures and plugins — and can also run unittest-style tests. It's the more common choice in practice.",
        example: "def test_add():\n    assert add(2, 3) == 5",
        followups: []
      },
      {
        q: "Why use a virtual environment?",
        a: "To isolate a project's dependencies (and their exact versions) from the system Python and from other projects, avoiding version conflicts when different projects need different versions of the same package.",
        example: "python -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt",
        followups: []
      },
      {
        q: "What are type hints, and does Python enforce them at runtime?",
        a: "Annotations like def add(a: int, b: int) -> int documenting expected types. Not enforced at runtime by default — they're for readability, IDE autocomplete, and static checking with a separate tool like mypy.",
        example: "def greet(name: str) -> str:\n    return f\"Hello, {name}\"",
        followups: []
      },
      {
        q: "What's the difference between requirements.txt and pyproject.toml?",
        a: "requirements.txt is a flat, pip-specific list of dependencies (often pinned) for reproducing an environment. pyproject.toml is the modern, tool-agnostic standard for project metadata, dependencies, and build config, used by tools like Poetry, Hatch, and modern pip.",
        example: null,
        followups: []
      },
      {
        q: "What's the difference between logging and print() for diagnostics?",
        a: "print() is fine for quick, throwaway debugging. The logging module supports severity levels (DEBUG/INFO/WARNING/ERROR), configurable output destinations, and can be filtered or disabled without editing code — essential for anything running in production.",
        example: null,
        followups: []
      }
    ]
  },
  {
    tier: "9. Advanced / Google-Level",
    items: [
      {
        q: "How would you implement a thread-safe Singleton in Python?",
        a: "Guard instance creation with a lock, double-checking that no other thread created it while this one was waiting for the lock.",
        example: "import threading\nclass Singleton:\n    _instance = None\n    _lock = threading.Lock()\n    def __new__(cls):\n        if cls._instance is None:\n            with cls._lock:\n                if cls._instance is None:\n                    cls._instance = super().__new__(cls)\n        return cls._instance",
        followups: [
          { q: "Why double-checked locking instead of always acquiring the lock?", a: "Acquiring a lock on every access would serialize all callers permanently; checking once unlocked, then again inside the lock, keeps the fast path lock-free after the first creation." }
        ]
      },
      {
        q: "How would you implement an LRU cache from scratch, and what's the expected complexity?",
        a: "A hash map from key to node plus a doubly linked list ordered by recency, giving O(1) get and put — the map gives O(1) lookup, the linked list gives O(1) reordering/eviction without shifting elements. (collections.OrderedDict does exactly this internally; functools.lru_cache is the built-in decorator version.)",
        example: null,
        followups: []
      },
      {
        q: "What is a metaclass, and when would you actually use one?",
        a: "A class whose instances are themselves classes — by default, type. Overriding __new__/__init__ on a custom metaclass customizes class creation itself (e.g. auto-registering every subclass). Powerful but rarely necessary — most of what metaclasses do can be done more simply with __init_subclass__ or a class decorator.",
        example: null,
        followups: []
      },
      {
        q: "What's the descriptor protocol, and where have you already used it without realizing?",
        a: "A descriptor is an object defining __get__/__set__/__delete__, letting a class customize attribute access. @property is implemented using descriptors — so is how instance methods bind to self.",
        example: null,
        followups: []
      },
      {
        q: "Why is NumPy fast despite Python itself being comparatively slow?",
        a: "NumPy operations run as compiled C loops over contiguous memory, avoiding per-element Python bytecode overhead and object boxing entirely — one vectorized NumPy call does all the work in C, instead of millions of individual Python-level operations.",
        example: null,
        followups: []
      },
      {
        q: "What's the Big-O of common Python built-in operations you should just know cold?",
        a: "list: append/index O(1), insert(0,x)/pop(0) O(n), 'in' O(n), sort O(n log n). dict/set: get/set/'in'/delete O(1) average, O(n) worst case. Assuming O(1) for pop(0) on a list is a common, real interview bug.",
        example: null,
        followups: []
      },
      {
        q: "How would you design a simple in-memory rate limiter as a Python class?",
        a: "A token bucket: track a token count and a last-refill timestamp; on each request, compute tokens to add based on elapsed time (capped at bucket size), then allow the request only if at least one token is available.",
        example: "import time\nclass TokenBucket:\n    def __init__(self, capacity, refill_rate):\n        self.capacity = capacity\n        self.tokens = capacity\n        self.refill_rate = refill_rate\n        self.last = time.time()\n    def allow(self):\n        now = time.time()\n        self.tokens = min(self.capacity, self.tokens + (now - self.last) * self.refill_rate)\n        self.last = now\n        if self.tokens >= 1:\n            self.tokens -= 1\n            return True\n        return False",
        followups: []
      },
      {
        q: "What's the difference between deep learning framework tensors and plain Python lists, from a systems perspective?",
        a: "Tensors (NumPy arrays, PyTorch tensors) are backed by contiguous, typed memory buffers with vectorized C/CUDA operations — a Python list is an array of pointers to separately-allocated Python objects, with per-element overhead and no vectorization. This is why converting between them at a hot loop's boundary (e.g. calling .item() repeatedly) is a common, real performance bug.",
        example: null,
        followups: []
      }
    ]
  }
];
