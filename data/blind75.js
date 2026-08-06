// Blind 75 — the canonical 75-slot / 74-unique-problem list originated by
// Yangshun Tay, organized by its standard categories. Prompts, approaches,
// and code below are original — not copied from LeetCode — matching the
// style of the rest of this site. "Merge K Sorted Lists" is listed once
// here (it appears in both the Linked List and Heap categories on the
// original list) so ids run b75-01..b75-74.
const BLIND75_PROBLEMS = [
  // ---------------- Array ----------------
  {
    id: "b75-01", title: "Two Sum", category: "Array",
    prompt: "Given an array of integers and a target, return the indices of the two numbers that add up to target.",
    example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0, 1]",
    approach: "Hash map from value to index, single pass, checking for the complement of each element as you go.",
    starter: "def two_sum(nums, target):\n    # your code here\n    pass\n",
    solution: "def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        c = target - x\n        if c in seen:\n            return [seen[c], i]\n        seen[x] = i\n    return []\n",
    complexity: "O(n) time, O(n) space.",
    whyComplexity: "Time is O(n) because the array is scanned once and each hash-map insert/lookup is O(1) average; space is O(n) for the hash map in the worst case.",
    tests: [{ call: "two_sum([2,7,11,15], 9)", expected: "[0, 1]" }]
  },
  {
    id: "b75-02", title: "Best Time to Buy and Sell Stock", category: "Array",
    prompt: "Given an array of daily stock prices, find the maximum profit from buying on one day and selling on a later day. Return 0 if no profit is possible.",
    example: "Input: prices = [7,1,5,3,6,4]\nOutput: 5",
    approach: "Track the minimum price seen so far; at each day, the best possible profit is today's price minus that running minimum.",
    starter: "def max_profit(prices):\n    # your code here\n    pass\n",
    solution: "def max_profit(prices):\n    min_price = float('inf')\n    best = 0\n    for p in prices:\n        min_price = min(min_price, p)\n        best = max(best, p - min_price)\n    return best\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) because the array is scanned once, updating the running minimum and best profit at each step; space is O(1) since only two scalar trackers are kept.",
    tests: [{ call: "max_profit([7,1,5,3,6,4])", expected: "5" }, { call: "max_profit([7,6,4,3,1])", expected: "0" }]
  },
  {
    id: "b75-03", title: "Contains Duplicate", category: "Array",
    prompt: "Given an array of integers, return True if any value appears at least twice.",
    example: "Input: nums = [1,2,3,1]\nOutput: True",
    approach: "A set dedupes automatically; if its length differs from the array's length, a duplicate exists.",
    starter: "def contains_duplicate(nums):\n    # your code here\n    pass\n",
    solution: "def contains_duplicate(nums):\n    return len(set(nums)) != len(nums)\n",
    complexity: "O(n) time, O(n) space.",
    whyComplexity: "Time is O(n) because building the set requires one hash insert per element; space is O(n) since the set can hold up to n distinct elements.",
    tests: [{ call: "contains_duplicate([1,2,3,1])", expected: "True" }, { call: "contains_duplicate([1,2,3,4])", expected: "False" }]
  },
  {
    id: "b75-04", title: "Product of Array Except Self", category: "Array",
    prompt: "Given an array, return an array where each element is the product of all other elements, without using division and in O(n) time.",
    example: "Input: nums = [1,2,3,4]\nOutput: [24,12,8,6]",
    approach: "Two passes: a running prefix-product array, then fold in a running suffix product from the right.",
    starter: "def product_except_self(nums):\n    # your code here\n    pass\n",
    solution: "def product_except_self(nums):\n    n = len(nums)\n    result = [1] * n\n    prefix = 1\n    for i in range(n):\n        result[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        result[i] *= suffix\n        suffix *= nums[i]\n    return result\n",
    complexity: "O(n) time, O(1) extra space (excluding the output array).",
    whyComplexity: "Time is O(n) because there are exactly two linear passes (prefix then suffix); space is O(1) extra beyond the required output array, since the running prefix and suffix products are folded directly into the result rather than stored separately.",
    tests: [{ call: "product_except_self([1,2,3,4])", expected: "[24, 12, 8, 6]" }]
  },
  {
    id: "b75-05", title: "Maximum Subarray", category: "Array",
    prompt: "Find the contiguous subarray with the largest sum and return that sum.",
    example: "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6   ([4,-1,2,1])",
    approach: "Kadane's algorithm: at each element, decide whether to extend the running subarray or start fresh from here.",
    starter: "def max_subarray(nums):\n    # your code here\n    pass\n",
    solution: "def max_subarray(nums):\n    best = curr = nums[0]\n    for x in nums[1:]:\n        curr = max(x, curr + x)\n        best = max(best, curr)\n    return best\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) because Kadane's algorithm makes one pass, deciding at each index whether to extend or restart the running subarray in O(1); space is O(1) since only the running and best sums are tracked.",
    tests: [{ call: "max_subarray([-2,1,-3,4,-1,2,1,-5,4])", expected: "6" }]
  },
  {
    id: "b75-06", title: "Maximum Product Subarray", category: "Array",
    prompt: "Find the contiguous subarray with the largest product and return that product.",
    example: "Input: nums = [2,3,-2,4]\nOutput: 6",
    approach: "Track both a running max and running min ending at each position, since multiplying by a negative number can flip the smallest product into the largest.",
    starter: "def max_product(nums):\n    # your code here\n    pass\n",
    solution: "def max_product(nums):\n    best = curr_max = curr_min = nums[0]\n    for x in nums[1:]:\n        candidates = (x, curr_max * x, curr_min * x)\n        curr_max, curr_min = max(candidates), min(candidates)\n        best = max(best, curr_max)\n    return best\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) for the same single-pass reason as Maximum Subarray; space is O(1) because only the running max, running min, and best-so-far are tracked — the running min is needed specifically to handle sign flips from negative numbers.",
    tests: [{ call: "max_product([2,3,-2,4])", expected: "6" }]
  },
  {
    id: "b75-07", title: "Find Minimum in Rotated Sorted Array", category: "Array",
    prompt: "A sorted array with distinct values has been rotated at an unknown pivot. Find the minimum element in O(log n).",
    example: "Input: nums = [4,5,6,7,0,1,2]\nOutput: 0",
    approach: "Binary search: compare the middle element to the rightmost element to decide which half contains the rotation point.",
    starter: "def find_min(nums):\n    # your code here\n    pass\n",
    solution: "def find_min(nums):\n    lo, hi = 0, len(nums) - 1\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if nums[mid] > nums[hi]:\n            lo = mid + 1\n        else:\n            hi = mid\n    return nums[lo]\n",
    complexity: "O(log n) time, O(1) space.",
    whyComplexity: "Time is O(log n) because each comparison against the rightmost element halves the search space; space is O(1) for the two pointers.",
    tests: [{ call: "find_min([4,5,6,7,0,1,2])", expected: "0" }, { call: "find_min([3,4,5,1,2])", expected: "1" }]
  },
  {
    id: "b75-08", title: "Search in Rotated Sorted Array", category: "Array",
    prompt: "Search for a target in a sorted array that has been rotated at an unknown pivot, in O(log n).",
    example: "Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4",
    approach: "Modified binary search: determine which half is properly sorted, then check whether the target's range falls in that half.",
    starter: "def search(nums, target):\n    # your code here\n    pass\n",
    solution: "def search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[lo] <= nums[mid]:\n            if nums[lo] <= target < nums[mid]:\n                hi = mid - 1\n            else:\n                lo = mid + 1\n        else:\n            if nums[mid] < target <= nums[hi]:\n                lo = mid + 1\n            else:\n                hi = mid - 1\n    return -1\n",
    complexity: "O(log n) time, O(1) space.",
    whyComplexity: "Time is O(log n) because each comparison eliminates half the remaining search space, just with an extra check for which half is properly sorted; space is O(1).",
    tests: [{ call: "search([4,5,6,7,0,1,2], 0)", expected: "4" }]
  },
  {
    id: "b75-09", title: "3Sum", category: "Array",
    prompt: "Given an array, return all unique triplets that sum to zero.",
    example: "Input: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
    approach: "Sort, then fix one element and use a two-pointer sweep on the rest, skipping duplicates at every position to avoid repeated triplets.",
    starter: "def three_sum(nums):\n    # your code here\n    pass\n",
    solution: "def three_sum(nums):\n    nums = sorted(nums)\n    result = []\n    n = len(nums)\n    for i in range(n - 2):\n        if i > 0 and nums[i] == nums[i-1]:\n            continue\n        left, right = i + 1, n - 1\n        while left < right:\n            s = nums[i] + nums[left] + nums[right]\n            if s < 0:\n                left += 1\n            elif s > 0:\n                right -= 1\n            else:\n                result.append([nums[i], nums[left], nums[right]])\n                left += 1\n                while left < right and nums[left] == nums[left-1]:\n                    left += 1\n                right -= 1\n    return result\n",
    complexity: "O(n^2) time, O(1) extra space beyond the output.",
    whyComplexity: "Time is O(n^2): the outer loop is O(n) and the inner two-pointer sweep is O(n) per outer iteration, dominating the O(n log n) initial sort; space is O(1) extra beyond the output.",
    tests: [{ call: "three_sum([-1,0,1,2,-1,-4])", expected: "[[-1, -1, 2], [-1, 0, 1]]" }]
  },
  {
    id: "b75-10", title: "Container With Most Water", category: "Array",
    prompt: "Given heights at each index, find two lines that, with the x-axis, hold the most water.",
    example: "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
    approach: "Two pointers from both ends; always move the pointer at the shorter line inward.",
    starter: "def max_area(height):\n    # your code here\n    pass\n",
    solution: "def max_area(height):\n    left, right = 0, len(height) - 1\n    best = 0\n    while left < right:\n        h = min(height[left], height[right])\n        best = max(best, h * (right - left))\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return best\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) because the two pointers only move inward and never revisit a position; space is O(1) since only a few index/variable trackers are kept.",
    tests: [{ call: "max_area([1,8,6,2,5,4,8,3,7])", expected: "49" }]
  },

  // ---------------- Binary ----------------
  {
    id: "b75-11", title: "Sum of Two Integers", category: "Binary",
    prompt: "Compute the sum of two integers without using the + or - operators.",
    example: "Input: a = 1, b = 2\nOutput: 3",
    approach: "Bitwise addition: XOR gives the sum without carry, AND-then-shift gives the carry; repeat until there is no carry left. Python integers are arbitrary precision, so a 32-bit mask keeps this well-defined for negative numbers too.",
    starter: "def get_sum(a, b):\n    # your code here\n    pass\n",
    solution: "def get_sum(a, b):\n    mask = 0xFFFFFFFF\n    while b != 0:\n        a, b = (a ^ b) & mask, ((a & b) << 1) & mask\n    if a > 0x7FFFFFFF:\n        a = ~(a ^ mask)\n    return a\n",
    complexity: "O(1) time (bounded by 32 bit positions), O(1) space.",
    whyComplexity: "Time is O(1) because the loop runs at most 32 times, bounded by the fixed bit-width mask, regardless of the input values; space is O(1) for the mask and accumulator.",
    tests: [{ call: "get_sum(1, 2)", expected: "3" }, { call: "get_sum(-2, 3)", expected: "1" }]
  },
  {
    id: "b75-12", title: "Number of 1 Bits", category: "Binary",
    prompt: "Count the number of set bits (1s) in the binary representation of an unsigned integer.",
    example: "Input: n = 11 (binary 1011)\nOutput: 3",
    approach: "Repeatedly clear the lowest set bit with n & (n-1) and count how many clears it takes to reach zero.",
    starter: "def hamming_weight(n):\n    # your code here\n    pass\n",
    solution: "def hamming_weight(n):\n    count = 0\n    while n:\n        n &= n - 1\n        count += 1\n    return count\n",
    complexity: "O(k) time where k is the number of set bits, O(1) space.",
    whyComplexity: "Time is O(k) where k is the number of set bits, since each iteration of n &= n-1 clears exactly one set bit; space is O(1) for the counter.",
    tests: [{ call: "hamming_weight(11)", expected: "3" }, { call: "hamming_weight(128)", expected: "1" }]
  },
  {
    id: "b75-13", title: "Counting Bits", category: "Binary",
    prompt: "For every integer from 0 to n, return the number of set bits in its binary representation.",
    example: "Input: n = 5\nOutput: [0,1,1,2,1,2]",
    approach: "DP: the bit count of i equals the bit count of i >> 1 plus whether i's lowest bit is set — dp[i] = dp[i >> 1] + (i & 1).",
    starter: "def count_bits(n):\n    # your code here\n    pass\n",
    solution: "def count_bits(n):\n    dp = [0] * (n + 1)\n    for i in range(1, n + 1):\n        dp[i] = dp[i >> 1] + (i & 1)\n    return dp\n",
    complexity: "O(n) time, O(n) space.",
    whyComplexity: "Time is O(n) because each of the n+1 entries is computed in O(1) from an already-computed earlier entry (dp[i >> 1]); space is O(n) for the output array itself.",
    tests: [{ call: "count_bits(5)", expected: "[0, 1, 1, 2, 1, 2]" }]
  },
  {
    id: "b75-14", title: "Missing Number", category: "Binary",
    prompt: "Given an array containing n distinct numbers from 0 to n, find the one number missing from the range.",
    example: "Input: nums = [3,0,1]\nOutput: 2",
    approach: "The expected sum of 0..n minus the actual sum of the array leaves exactly the missing number.",
    starter: "def missing_number(nums):\n    # your code here\n    pass\n",
    solution: "def missing_number(nums):\n    n = len(nums)\n    return n * (n + 1) // 2 - sum(nums)\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) for the single pass to sum the array; space is O(1) since only a running sum is tracked.",
    tests: [{ call: "missing_number([3,0,1])", expected: "2" }, { call: "missing_number([0,1])", expected: "2" }]
  },
  {
    id: "b75-15", title: "Reverse Bits", category: "Binary",
    prompt: "Reverse the bits of a given 32-bit unsigned integer.",
    example: "Input: n = 0b00000010100101000001111010011100\nOutput: 0b00111001011110000010100101000000",
    approach: "Shift the result left and pull the lowest bit of n into it, 32 times.",
    starter: "def reverse_bits(n):\n    # your code here\n    pass\n",
    solution: "def reverse_bits(n):\n    result = 0\n    for _ in range(32):\n        result = (result << 1) | (n & 1)\n        n >>= 1\n    return result\n",
    complexity: "O(1) time (fixed 32 iterations), O(1) space.",
    whyComplexity: "Time is O(1) because the loop always runs exactly 32 times regardless of input; space is O(1) for the accumulator.",
    tests: [{ call: "reverse_bits(1)", expected: "2147483648" }]
  },

  // ---------------- Dynamic Programming ----------------
  {
    id: "b75-16", title: "Climbing Stairs", category: "Dynamic Programming",
    prompt: "You can climb 1 or 2 steps at a time. Given n stairs, how many distinct ways can you reach the top?",
    example: "Input: n = 5\nOutput: 8",
    approach: "This is the Fibonacci recurrence: ways(n) = ways(n-1) + ways(n-2), since the last step taken was either a single or a double.",
    starter: "def climb_stairs(n):\n    # your code here\n    pass\n",
    solution: "def climb_stairs(n):\n    a, b = 1, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) because the Fibonacci-style recurrence is computed once per step in a single forward pass; space is O(1) since only the previous two values are kept.",
    tests: [{ call: "climb_stairs(5)", expected: "8" }, { call: "climb_stairs(2)", expected: "2" }]
  },
  {
    id: "b75-17", title: "Coin Change", category: "Dynamic Programming",
    prompt: "Given coin denominations and a target amount, find the minimum number of coins to reach that amount, or -1 if impossible.",
    example: "Input: coins = [1,2,5], amount = 11\nOutput: 3",
    approach: "Bottom-up unbounded-knapsack DP: dp[amount] built from smaller amounts.",
    starter: "def coin_change(coins, amount):\n    # your code here\n    pass\n",
    solution: "def coin_change(coins, amount):\n    dp = [0] + [float('inf')] * amount\n    for a in range(1, amount + 1):\n        for c in coins:\n            if c <= a:\n                dp[a] = min(dp[a], dp[a - c] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1\n",
    complexity: "O(amount * len(coins)) time, O(amount) space.",
    whyComplexity: "Time is O(amount * len(coins)) because every amount from 1 to the target tries every coin once; space is O(amount) for the DP array.",
    tests: [{ call: "coin_change([1,2,5], 11)", expected: "3" }, { call: "coin_change([2], 3)", expected: "-1" }]
  },
  {
    id: "b75-18", title: "Longest Increasing Subsequence", category: "Dynamic Programming",
    prompt: "Find the length of the longest strictly increasing subsequence of an array.",
    example: "Input: nums = [10,9,2,5,3,7,101,18]\nOutput: 4   ([2,3,7,101] or similar)",
    approach: "Maintain a 'tails' array where tails[i] is the smallest possible tail of an increasing subsequence of length i+1. Binary search each new value into place; the final length of tails is the answer.",
    starter: "import bisect\n\ndef length_of_lis(nums):\n    # your code here\n    pass\n",
    solution: "import bisect\n\ndef length_of_lis(nums):\n    tails = []\n    for x in nums:\n        i = bisect.bisect_left(tails, x)\n        if i == len(tails):\n            tails.append(x)\n        else:\n            tails[i] = x\n    return len(tails)\n",
    complexity: "O(n log n) time, O(n) space.",
    whyComplexity: "Time is O(n log n) because each of the n elements does one binary search into the tails array; space is O(n) worst case for tails if the sequence is already fully increasing.",
    tests: [{ call: "length_of_lis([10,9,2,5,3,7,101,18])", expected: "4" }]
  },
  {
    id: "b75-19", title: "Longest Common Subsequence", category: "Dynamic Programming",
    prompt: "Given two strings, find the length of their longest common subsequence.",
    example: "Input: text1 = \"abcde\", text2 = \"ace\"\nOutput: 3",
    approach: "2D DP: dp[i][j] is the LCS length of the first i and j characters of each string. A match extends the diagonal; a mismatch takes the best of dropping a character from either string.",
    starter: "def lcs(s1, s2):\n    # your code here\n    pass\n",
    solution: "def lcs(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            if s1[i-1] == s2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]\n",
    complexity: "O(m * n) time and space.",
    whyComplexity: "Time is O(m * n) because the DP table has m*n cells, each filled in O(1) from its neighbors; space is O(m * n) for the table.",
    tests: [{ call: "lcs('abcde', 'ace')", expected: "3" }]
  },
  {
    id: "b75-20", title: "Word Break", category: "Dynamic Programming",
    prompt: "Given a string and a dictionary of words, determine whether the string can be segmented into a sequence of dictionary words.",
    example: "Input: s = \"leetcode\", wordDict = [\"leet\",\"code\"]\nOutput: True",
    approach: "DP over prefixes: dp[i] is True if s[:i] can be segmented. For each i, check every earlier split point j where dp[j] is True and s[j:i] is in the dictionary.",
    starter: "def word_break(s, word_dict):\n    # your code here\n    pass\n",
    solution: "def word_break(s, word_dict):\n    word_set = set(word_dict)\n    n = len(s)\n    dp = [False] * (n + 1)\n    dp[0] = True\n    for i in range(1, n + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in word_set:\n                dp[i] = True\n                break\n    return dp[n]\n",
    complexity: "O(n^2) time, O(n) space.",
    whyComplexity: "Time is O(n^2) because for each of the n end positions, every earlier start position is tried, with each substring check O(1) amortized via the set; space is O(n) for the DP array plus the word set.",
    tests: [{ call: "word_break('leetcode', ['leet','code'])", expected: "True" }, { call: "word_break('catsandog', ['cats','dog','sand','and','cat'])", expected: "False" }]
  },
  {
    id: "b75-21", title: "Combination Sum IV", category: "Dynamic Programming",
    prompt: "Given an array of distinct positive integers and a target, count the number of possible ordered combinations that add up to target (order matters, so [1,2] and [2,1] are counted separately).",
    example: "Input: nums = [1,2,3], target = 4\nOutput: 7",
    approach: "DP over the target: dp[t] sums dp[t - n] over every allowed number n, since the last number used partitions the count.",
    starter: "def combination_sum4(nums, target):\n    # your code here\n    pass\n",
    solution: "def combination_sum4(nums, target):\n    dp = [0] * (target + 1)\n    dp[0] = 1\n    for t in range(1, target + 1):\n        for n in nums:\n            if n <= t:\n                dp[t] += dp[t - n]\n    return dp[target]\n",
    complexity: "O(target * len(nums)) time, O(target) space.",
    whyComplexity: "Time is O(target * len(nums)) because every amount from 1 to target tries every number once; space is O(target) for the DP array.",
    tests: [{ call: "combination_sum4([1,2,3], 4)", expected: "7" }]
  },
  {
    id: "b75-22", title: "House Robber", category: "Dynamic Programming",
    prompt: "Given amounts of money at houses in a row, maximize the sum you can rob without robbing two adjacent houses.",
    example: "Input: nums = [1,2,3,1]\nOutput: 4",
    approach: "1D DP: at each house, take the best of skipping it or robbing it plus the best result from two houses back.",
    starter: "def rob(nums):\n    # your code here\n    pass\n",
    solution: "def rob(nums):\n    prev, curr = 0, 0\n    for x in nums:\n        prev, curr = curr, max(curr, prev + x)\n    return curr\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) because each house is processed once in a single forward pass; space is O(1) since only the previous two running totals are kept.",
    tests: [{ call: "rob([1,2,3,1])", expected: "4" }, { call: "rob([2,7,9,3,1])", expected: "12" }]
  },
  {
    id: "b75-23", title: "House Robber II", category: "Dynamic Programming",
    prompt: "Same as House Robber, but the houses are arranged in a circle, so the first and last houses are adjacent.",
    example: "Input: nums = [2,3,2]\nOutput: 3",
    approach: "Run the linear House Robber twice — once excluding the last house, once excluding the first — and take the better result, which handles the wraparound adjacency.",
    starter: "def rob2(nums):\n    # your code here\n    pass\n",
    solution: "def rob2(nums):\n    if len(nums) == 1:\n        return nums[0]\n    def rob_line(arr):\n        prev, curr = 0, 0\n        for x in arr:\n            prev, curr = curr, max(curr, prev + x)\n        return curr\n    return max(rob_line(nums[:-1]), rob_line(nums[1:]))\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) because the linear House Robber routine, itself O(n), runs exactly twice on two overlapping subarrays of size n-1; space is O(1) since each pass only keeps two running totals.",
    tests: [{ call: "rob2([2,3,2])", expected: "3" }, { call: "rob2([1,2,3,1])", expected: "4" }]
  },
  {
    id: "b75-24", title: "Decode Ways", category: "Dynamic Programming",
    prompt: "A digit string can be decoded into letters (A=1 ... Z=26). Count the number of ways to decode it.",
    example: "Input: s = \"226\"\nOutput: 3   (\"BZ\", \"VF\", \"BBF\")",
    approach: "DP over prefixes: each position can extend by consuming one digit (if nonzero) or two digits (if the two-digit number is 10-26).",
    starter: "def num_decodings(s):\n    # your code here\n    pass\n",
    solution: "def num_decodings(s):\n    if not s or s[0] == '0':\n        return 0\n    n = len(s)\n    dp = [0] * (n + 1)\n    dp[0] = 1\n    dp[1] = 1\n    for i in range(2, n + 1):\n        if s[i-1] != '0':\n            dp[i] += dp[i-1]\n        two_digit = int(s[i-2:i])\n        if 10 <= two_digit <= 26:\n            dp[i] += dp[i-2]\n    return dp[n]\n",
    complexity: "O(n) time, O(n) space.",
    whyComplexity: "Time is O(n) because each position's DP value is computed in O(1) from only the one and two positions before it; space is O(n) for the DP array (reducible to O(1)).",
    tests: [{ call: "num_decodings('226')", expected: "3" }, { call: "num_decodings('06')", expected: "0" }]
  },
  {
    id: "b75-25", title: "Unique Paths", category: "Dynamic Programming",
    prompt: "A robot starts at the top-left of an m x n grid and can only move right or down. How many unique paths are there to the bottom-right corner?",
    example: "Input: m = 3, n = 7\nOutput: 28",
    approach: "DP grid where each cell is the sum of the cell above and the cell to the left; the first row and column are all 1 since there's only one way to reach them.",
    starter: "def unique_paths(m, n):\n    # your code here\n    pass\n",
    solution: "def unique_paths(m, n):\n    dp = [[1]*n for _ in range(m)]\n    for i in range(1, m):\n        for j in range(1, n):\n            dp[i][j] = dp[i-1][j] + dp[i][j-1]\n    return dp[m-1][n-1]\n",
    complexity: "O(m * n) time and space (reducible to O(n)).",
    whyComplexity: "Time is O(m * n) because every grid cell is filled once from its top and left neighbors; space is O(m * n) for the DP grid (reducible to O(n)).",
    tests: [{ call: "unique_paths(3, 7)", expected: "28" }, { call: "unique_paths(3, 2)", expected: "3" }]
  },
  {
    id: "b75-26", title: "Jump Game", category: "Dynamic Programming",
    prompt: "Given an array where each element is your maximum jump length from that position, determine whether you can reach the last index starting from index 0.",
    example: "Input: nums = [2,3,1,1,4]\nOutput: True",
    approach: "Greedy: track the furthest index reachable so far. If the current index ever exceeds that reach, you're stuck.",
    starter: "def can_jump(nums):\n    # your code here\n    pass\n",
    solution: "def can_jump(nums):\n    max_reach = 0\n    for i, x in enumerate(nums):\n        if i > max_reach:\n            return False\n        max_reach = max(max_reach, i + x)\n    return max_reach >= len(nums) - 1\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) because the greedy scan makes a single forward pass, updating the farthest-reachable index once per position; space is O(1) since only that running value is tracked.",
    tests: [{ call: "can_jump([2,3,1,1,4])", expected: "True" }, { call: "can_jump([3,2,1,0,4])", expected: "False" }]
  },

  // ---------------- Graph ----------------
  {
    id: "b75-27", title: "Clone Graph", category: "Graph",
    prompt: "Given a reference node in a connected undirected graph, return a deep copy of the graph.",
    example: "A graph node has .val and .neighbors (a list of adjacent nodes).",
    approach: "DFS with a hash map from original node to its clone, so each node is cloned exactly once even with cycles.",
    starter: "class Node:\n    def __init__(self, val=0, neighbors=None):\n        self.val = val\n        self.neighbors = neighbors if neighbors is not None else []\n\ndef clone_graph(node):\n    # your code here\n    pass\n",
    solution: "class Node:\n    def __init__(self, val=0, neighbors=None):\n        self.val = val\n        self.neighbors = neighbors if neighbors is not None else []\n\ndef clone_graph(node):\n    if not node:\n        return None\n    visited = {}\n    def dfs(n):\n        if n in visited:\n            return visited[n]\n        copy = Node(n.val)\n        visited[n] = copy\n        for nb in n.neighbors:\n            copy.neighbors.append(dfs(nb))\n        return copy\n    return dfs(node)\n",
    complexity: "O(V + E) time and space.",
    whyComplexity: "Time is O(V + E) because DFS visits every node once and follows every edge once to clone neighbor lists; space is O(V) for the visited/clone map plus recursion depth.",
    tests: []
  },
  {
    id: "b75-28", title: "Course Schedule", category: "Graph",
    prompt: "Given a number of courses and prerequisite pairs, determine whether all courses can be finished (whether the prerequisite graph is a DAG).",
    example: "Input: numCourses = 2, prerequisites = [[1,0]]\nOutput: True",
    approach: "Kahn's algorithm: compute in-degree per course, repeatedly remove zero-in-degree courses. If every course gets removed, there's no cycle.",
    starter: "def can_finish(num_courses, prerequisites):\n    # your code here\n    pass\n",
    solution: "from collections import deque, defaultdict\n\ndef can_finish(num_courses, prerequisites):\n    graph = defaultdict(list)\n    in_degree = [0] * num_courses\n    for course, prereq in prerequisites:\n        graph[prereq].append(course)\n        in_degree[course] += 1\n    queue = deque(c for c in range(num_courses) if in_degree[c] == 0)\n    visited = 0\n    while queue:\n        node = queue.popleft()\n        visited += 1\n        for nxt in graph[node]:\n            in_degree[nxt] -= 1\n            if in_degree[nxt] == 0:\n                queue.append(nxt)\n    return visited == num_courses\n",
    complexity: "O(V + E) time, O(V + E) space.",
    whyComplexity: "Time is O(V + E) because Kahn's algorithm processes each vertex once and each edge once when relaxing in-degrees; space is O(V + E) for the adjacency list and queue.",
    tests: [{ call: "can_finish(2, [[1,0]])", expected: "True" }, { call: "can_finish(2, [[1,0],[0,1]])", expected: "False" }]
  },
  {
    id: "b75-29", title: "Pacific Atlantic Water Flow", category: "Graph",
    prompt: "Given a grid of heights where the Pacific touches the top and left edges and the Atlantic touches the bottom and right edges, find every cell from which water can flow to both oceans (water flows from a cell to an equal-or-lower neighbor).",
    example: "A single-cell grid touches both oceans trivially: heights = [[1]] -> [[0, 0]]",
    approach: "Multi-source DFS from each ocean's border cells, walking uphill (or equal) into the interior; a cell reachable from both searches can flow to both oceans.",
    starter: "def pacific_atlantic(heights):\n    # your code here\n    pass\n",
    solution: "def pacific_atlantic(heights):\n    if not heights or not heights[0]:\n        return []\n    rows, cols = len(heights), len(heights[0])\n    pacific, atlantic = set(), set()\n\n    def dfs(r, c, visited, prev_height):\n        if (r, c) in visited or r < 0 or r >= rows or c < 0 or c >= cols or heights[r][c] < prev_height:\n            return\n        visited.add((r, c))\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            dfs(r+dr, c+dc, visited, heights[r][c])\n\n    for c in range(cols):\n        dfs(0, c, pacific, heights[0][c])\n        dfs(rows-1, c, atlantic, heights[rows-1][c])\n    for r in range(rows):\n        dfs(r, 0, pacific, heights[r][0])\n        dfs(r, cols-1, atlantic, heights[r][cols-1])\n\n    return sorted([list(x) for x in pacific & atlantic])\n",
    complexity: "O(rows * cols) time and space.",
    whyComplexity: "Time is O(rows * cols) because each of the two DFS searches visits each cell at most once thanks to the visited sets; space is O(rows * cols) for the two visited sets plus recursion depth.",
    tests: [{ call: "pacific_atlantic([[1]])", expected: "[[0, 0]]" }]
  },
  {
    id: "b75-30", title: "Number of Islands", category: "Graph",
    prompt: "Given a 2D grid of '1' (land) and '0' (water), count the number of islands (4-directionally connected land regions).",
    example: "Input: grid = [['1','1','0'],['1','0','0'],['0','0','1']]\nOutput: 2",
    approach: "DFS or BFS flood-fill from every unvisited land cell, marking visited cells to avoid recounting.",
    starter: "def num_islands(grid):\n    # your code here\n    pass\n",
    solution: "def num_islands(grid):\n    if not grid:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n\n    def dfs(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':\n            return\n        grid[r][c] = '0'\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            dfs(r+dr, c+dc)\n\n    count = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count += 1\n                dfs(r, c)\n    return count\n",
    complexity: "O(rows * cols) time and space.",
    whyComplexity: "Time is O(rows * cols) because the DFS visits each cell at most once thanks to in-place visited-marking; space is O(rows * cols) worst case for the recursion stack on one giant island.",
    tests: [{ call: "num_islands([['1','1','0'],['1','0','0'],['0','0','1']])", expected: "2" }]
  },
  {
    id: "b75-31", title: "Longest Consecutive Sequence", category: "Graph",
    prompt: "Given an unsorted array of integers, find the length of the longest run of consecutive integers, in O(n) time.",
    example: "Input: nums = [100,4,200,1,3,2]\nOutput: 4   ([1,2,3,4])",
    approach: "Put everything in a set. Only start counting a sequence from a number whose predecessor (num - 1) is not in the set, so each sequence is walked exactly once.",
    starter: "def longest_consecutive(nums):\n    # your code here\n    pass\n",
    solution: "def longest_consecutive(nums):\n    num_set = set(nums)\n    best = 0\n    for x in num_set:\n        if x - 1 not in num_set:\n            length = 1\n            while x + length in num_set:\n                length += 1\n            best = max(best, length)\n    return best\n",
    complexity: "O(n) time, O(n) space.",
    whyComplexity: "Time is O(n) because although there's a nested while loop, it only runs for numbers that start a sequence (predecessor not in the set), so across the whole run every number is visited by it at most once total; space is O(n) for the set.",
    tests: [{ call: "longest_consecutive([100,4,200,1,3,2])", expected: "4" }]
  },
  {
    id: "b75-32", title: "Alien Dictionary", category: "Graph",
    prompt: "Given a list of words from an alien language, sorted according to that language's unknown alphabet ordering, derive one valid character ordering. Return an empty string if the ordering is contradictory.",
    example: "Input: words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]\nOutput: a valid ordering such as \"wertf\"",
    approach: "Compare each pair of adjacent words to find the first differing character, which gives a 'comes before' edge between two letters. Topologically sort the resulting graph; if a cycle exists, or a word is a prefix of an earlier, longer word, the ordering is invalid.",
    starter: "def alien_order(words):\n    # your code here\n    pass\n",
    solution: "from collections import defaultdict, deque\n\ndef alien_order(words):\n    graph = defaultdict(set)\n    in_degree = {c: 0 for w in words for c in w}\n    for w1, w2 in zip(words, words[1:]):\n        min_len = min(len(w1), len(w2))\n        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:\n            return \"\"\n        for c1, c2 in zip(w1, w2):\n            if c1 != c2:\n                if c2 not in graph[c1]:\n                    graph[c1].add(c2)\n                    in_degree[c2] += 1\n                break\n    queue = deque([c for c in in_degree if in_degree[c] == 0])\n    order = []\n    while queue:\n        c = queue.popleft()\n        order.append(c)\n        for nxt in graph[c]:\n            in_degree[nxt] -= 1\n            if in_degree[nxt] == 0:\n                queue.append(nxt)\n    if len(order) != len(in_degree):\n        return \"\"\n    return \"\".join(order)\n",
    complexity: "O(total characters) time and space.",
    whyComplexity: "Time is O(C) for total character count C, since building the graph scans adjacent word pairs once and the topological sort visits each character node and edge once; space is O(1) extra beyond the graph, since the alphabet size is bounded.",
    tests: []
  },
  {
    id: "b75-33", title: "Graph Valid Tree", category: "Graph",
    prompt: "Given n nodes labeled 0 to n-1 and a list of undirected edges, determine whether the edges form a valid tree (fully connected, no cycles).",
    example: "Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]\nOutput: True",
    approach: "A valid tree on n nodes has exactly n-1 edges and no cycles. Union-Find both checks the edge count and detects any cycle (a union that tries to connect two already-connected nodes).",
    starter: "def valid_tree(n, edges):\n    # your code here\n    pass\n",
    solution: "def valid_tree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    for a, b in edges:\n        ra, rb = find(a), find(b)\n        if ra == rb:\n            return False\n        parent[ra] = rb\n    return True\n",
    complexity: "Nearly O(n) time with union-find, O(n) space.",
    whyComplexity: "Time is nearly O(n) because union-find with path compression makes each union/find call nearly constant time; space is O(n) for the parent array.",
    tests: [{ call: "valid_tree(5, [[0,1],[0,2],[0,3],[1,4]])", expected: "True" }, { call: "valid_tree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])", expected: "False" }]
  },
  {
    id: "b75-34", title: "Number of Connected Components in an Undirected Graph", category: "Graph",
    prompt: "Given n nodes and a list of undirected edges, count the number of connected components.",
    example: "Input: n = 5, edges = [[0,1],[1,2],[3,4]]\nOutput: 2",
    approach: "Union-Find: union every edge's endpoints, then count the number of distinct roots remaining.",
    starter: "def count_components(n, edges):\n    # your code here\n    pass\n",
    solution: "def count_components(n, edges):\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    for a, b in edges:\n        ra, rb = find(a), find(b)\n        if ra != rb:\n            parent[ra] = rb\n    return len({find(x) for x in range(n)})\n",
    complexity: "Nearly O(n) time with union-find, O(n) space.",
    whyComplexity: "Time is nearly O(n) for the same union-find reason; space is O(n) for the parent array.",
    tests: [{ call: "count_components(5, [[0,1],[1,2],[3,4]])", expected: "2" }]
  },

  // ---------------- Interval ----------------
  {
    id: "b75-35", title: "Insert Interval", category: "Interval",
    prompt: "Given a list of non-overlapping intervals sorted by start time, insert a new interval and merge as needed.",
    example: "Input: intervals = [[1,3],[6,9]], newInterval = [2,5]\nOutput: [[1,5],[6,9]]",
    approach: "Walk through in three phases: copy intervals fully before the new one, merge every interval that overlaps the new one, then copy the rest unchanged.",
    starter: "def insert(intervals, new_interval):\n    # your code here\n    pass\n",
    solution: "def insert(intervals, new_interval):\n    result = []\n    i, n = 0, len(intervals)\n    while i < n and intervals[i][1] < new_interval[0]:\n        result.append(intervals[i])\n        i += 1\n    while i < n and intervals[i][0] <= new_interval[1]:\n        new_interval = [min(new_interval[0], intervals[i][0]), max(new_interval[1], intervals[i][1])]\n        i += 1\n    result.append(new_interval)\n    while i < n:\n        result.append(intervals[i])\n        i += 1\n    return result\n",
    complexity: "O(n) time, O(n) space.",
    whyComplexity: "Time is O(n) because the three phases (before, overlapping, after) together touch each interval exactly once; space is O(n) for the result list.",
    tests: [{ call: "insert([[1,3],[6,9]], [2,5])", expected: "[[1, 5], [6, 9]]" }]
  },
  {
    id: "b75-36", title: "Merge Intervals", category: "Interval",
    prompt: "Given a list of intervals, merge all overlapping intervals.",
    example: "Input: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]",
    approach: "Sort by start time, then sweep through, extending the last merged interval whenever the next one overlaps it.",
    starter: "def merge(intervals):\n    # your code here\n    pass\n",
    solution: "def merge(intervals):\n    intervals = sorted(intervals, key=lambda x: x[0])\n    result = [intervals[0]]\n    for start, end in intervals[1:]:\n        if start <= result[-1][1]:\n            result[-1][1] = max(result[-1][1], end)\n        else:\n            result.append([start, end])\n    return result\n",
    complexity: "O(n log n) time for the sort, O(n) space.",
    whyComplexity: "Time is O(n log n), dominated by the initial sort; the merge pass afterward is O(n). Space is O(n) for the sorted copy and result.",
    tests: [{ call: "merge([[1,3],[2,6],[8,10],[15,18]])", expected: "[[1, 6], [8, 10], [15, 18]]" }]
  },
  {
    id: "b75-37", title: "Non-overlapping Intervals", category: "Interval",
    prompt: "Given a list of intervals, find the minimum number of intervals to remove so the rest don't overlap.",
    example: "Input: intervals = [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1",
    approach: "Greedy: sort by end time, and whenever the next interval starts before the previous kept interval ends, remove it (count it) rather than the one already kept.",
    starter: "def erase_overlap_intervals(intervals):\n    # your code here\n    pass\n",
    solution: "def erase_overlap_intervals(intervals):\n    if not intervals:\n        return 0\n    intervals = sorted(intervals, key=lambda x: x[1])\n    count = 0\n    prev_end = intervals[0][1]\n    for start, end in intervals[1:]:\n        if start < prev_end:\n            count += 1\n        else:\n            prev_end = end\n    return count\n",
    complexity: "O(n log n) time, O(1) extra space.",
    whyComplexity: "Time is O(n log n) for the sort by end time; the greedy scan afterward is O(n). Space is O(1) extra beyond the sort, since only a running previous-end value is tracked.",
    tests: [{ call: "erase_overlap_intervals([[1,2],[2,3],[3,4],[1,3]])", expected: "1" }]
  },
  {
    id: "b75-38", title: "Meeting Rooms", category: "Interval",
    prompt: "Given an array of meeting time intervals, determine whether a single person could attend all of them (no two meetings overlap).",
    example: "Input: intervals = [[0,30],[5,10],[15,20]]\nOutput: False",
    approach: "Sort by start time; if any meeting starts before the previous one ends, they conflict.",
    starter: "def can_attend_meetings(intervals):\n    # your code here\n    pass\n",
    solution: "def can_attend_meetings(intervals):\n    intervals = sorted(intervals, key=lambda x: x[0])\n    for i in range(1, len(intervals)):\n        if intervals[i][0] < intervals[i-1][1]:\n            return False\n    return True\n",
    complexity: "O(n log n) time, O(1) extra space.",
    whyComplexity: "Time is O(n log n) for the sort; the comparison pass afterward is O(n). Space is O(1) extra beyond the sort.",
    tests: [{ call: "can_attend_meetings([[0,30],[5,10],[15,20]])", expected: "False" }, { call: "can_attend_meetings([[7,10],[2,4]])", expected: "True" }]
  },
  {
    id: "b75-39", title: "Meeting Rooms II", category: "Interval",
    prompt: "Given an array of meeting time intervals, find the minimum number of conference rooms required to hold all of them.",
    example: "Input: intervals = [[0,30],[5,10],[15,20]]\nOutput: 2",
    approach: "Sort by start time and track end times of currently-running meetings in a min-heap. If the earliest-ending meeting has already finished by the time the next one starts, reuse its room instead of allocating a new one.",
    starter: "import heapq\n\ndef min_meeting_rooms(intervals):\n    # your code here\n    pass\n",
    solution: "import heapq\n\ndef min_meeting_rooms(intervals):\n    if not intervals:\n        return 0\n    intervals = sorted(intervals, key=lambda x: x[0])\n    heap = []\n    for start, end in intervals:\n        if heap and heap[0] <= start:\n            heapq.heapreplace(heap, end)\n        else:\n            heapq.heappush(heap, end)\n    return len(heap)\n",
    complexity: "O(n log n) time, O(n) space.",
    whyComplexity: "Time is O(n log n) because after the initial sort, each of the n meetings triggers one O(log n) heap push or replace; space is O(n) worst case for the heap if every meeting overlaps.",
    tests: [{ call: "min_meeting_rooms([[0,30],[5,10],[15,20]])", expected: "2" }]
  },

  // ---------------- Linked List ----------------
  {
    id: "b75-40", title: "Reverse a Linked List", category: "Linked List",
    prompt: "Reverse a singly linked list in place and return the new head.",
    example: "Input: 1 -> 2 -> 3 -> None\nOutput: 3 -> 2 -> 1 -> None",
    approach: "Iterate, re-pointing each node's next pointer to the previous node.",
    starter: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef reverse_list(head):\n    # your code here\n    pass\n",
    solution: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev\n\ndef to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\ndef from_list(vals):\n    head = None\n    for v in reversed(vals):\n        head = ListNode(v, head)\n    return head\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) because each node is visited and re-pointed exactly once; space is O(1) since the reversal happens in place.",
    tests: [{ call: "to_list(reverse_list(from_list([1,2,3,4])))", expected: "[4, 3, 2, 1]" }]
  },
  {
    id: "b75-41", title: "Detect Cycle in a Linked List", category: "Linked List",
    prompt: "Given the head of a linked list, determine whether it contains a cycle.",
    example: "3 -> 2 -> 0 -> -4 -> (back to 2)  ->  True",
    approach: "Floyd's tortoise and hare: two pointers moving at speeds 1 and 2. If they ever meet, a cycle exists.",
    starter: "def has_cycle(head):\n    # your code here\n    pass\n",
    solution: "def has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:\n            return True\n    return False\n",
    complexity: "O(n) time, O(1) space.",
    whyComplexity: "Time is O(n) because the fast pointer either meets the slow pointer within n steps (if a cycle exists) or reaches the end (if not); space is O(1) for the two pointers.",
    tests: []
  },
  {
    id: "b75-42", title: "Merge Two Sorted Lists", category: "Linked List",
    prompt: "Merge two sorted linked lists into one sorted list by splicing their nodes together.",
    example: "Input: l1 = [1,2,4], l2 = [1,3,4]\nOutput: [1,1,2,3,4,4]",
    approach: "Use a dummy head and a tail pointer; repeatedly attach whichever list's current node is smaller.",
    starter: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef merge_two_lists(l1, l2):\n    # your code here\n    pass\n",
    solution: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef merge_two_lists(l1, l2):\n    dummy = ListNode()\n    tail = dummy\n    while l1 and l2:\n        if l1.val <= l2.val:\n            tail.next = l1\n            l1 = l1.next\n        else:\n            tail.next = l2\n            l2 = l2.next\n        tail = tail.next\n    tail.next = l1 or l2\n    return dummy.next\n\ndef to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\ndef from_list(vals):\n    head = None\n    for v in reversed(vals):\n        head = ListNode(v, head)\n    return head\n",
    complexity: "O(m + n) time, O(1) extra space.",
    whyComplexity: "Time is O(m + n) because each node from both lists is examined and spliced in exactly once; space is O(1) extra since existing nodes are relinked rather than copied.",
    tests: [{ call: "to_list(merge_two_lists(from_list([1,2,4]), from_list([1,3,4])))", expected: "[1, 1, 2, 3, 4, 4]" }]
  },
  {
    id: "b75-43", title: "Merge K Sorted Lists", category: "Linked List",
    prompt: "Merge k sorted linked lists into one sorted list. (Appears in both the Linked List and Heap sections of the original list.)",
    example: "Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
    approach: "Push the head of each list onto a min-heap keyed by value; repeatedly pop the smallest node and push its successor.",
    starter: "import heapq\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef merge_k_lists(lists):\n    # your code here\n    pass\n",
    solution: "import heapq\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef merge_k_lists(lists):\n    heap = []\n    for i, node in enumerate(lists):\n        if node:\n            heapq.heappush(heap, (node.val, i, node))\n    dummy = ListNode()\n    tail = dummy\n    while heap:\n        val, i, node = heapq.heappop(heap)\n        tail.next = node\n        tail = tail.next\n        if node.next:\n            heapq.heappush(heap, (node.next.val, i, node.next))\n    return dummy.next\n\ndef to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\ndef from_list(vals):\n    head = None\n    for v in reversed(vals):\n        head = ListNode(v, head)\n    return head\n",
    complexity: "O(N log k) time for N total nodes across k lists, O(k) space.",
    whyComplexity: "Time is O(N log k) because there are N total nodes and each triggers one O(log k) heap operation on a heap capped at one entry per list; space is O(k) for the heap.",
    tests: [{ call: "to_list(merge_k_lists([from_list([1,4,5]), from_list([1,3,4]), from_list([2,6])]))", expected: "[1, 1, 2, 3, 4, 4, 5, 6]" }]
  },
  {
    id: "b75-44", title: "Remove Nth Node From End of List", category: "Linked List",
    prompt: "Given a linked list, remove the nth node from the end and return the head.",
    example: "Input: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]",
    approach: "Two pointers with a gap of n: advance a fast pointer n steps ahead, then move both until fast hits the end; slow now sits just before the node to remove.",
    starter: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef remove_nth_from_end(head, n):\n    # your code here\n    pass\n",
    solution: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef remove_nth_from_end(head, n):\n    dummy = ListNode(0, head)\n    fast = slow = dummy\n    for _ in range(n):\n        fast = fast.next\n    while fast.next:\n        fast = fast.next\n        slow = slow.next\n    slow.next = slow.next.next\n    return dummy.next\n\ndef to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\ndef from_list(vals):\n    head = None\n    for v in reversed(vals):\n        head = ListNode(v, head)\n    return head\n",
    complexity: "O(n) time (single pass), O(1) space.",
    whyComplexity: "Time is O(n) because the two-pointer gap technique traverses the list once, no second pass needed; space is O(1) for the fixed number of pointers.",
    tests: [{ call: "to_list(remove_nth_from_end(from_list([1,2,3,4,5]), 2))", expected: "[1, 2, 3, 5]" }]
  },
  {
    id: "b75-45", title: "Reorder List", category: "Linked List",
    prompt: "Given a linked list L0-L1-...-Ln, reorder it in place to L0-Ln-L1-Ln-1-L2-Ln-2-...",
    example: "Input: [1,2,3,4]\nOutput: [1,4,2,3]",
    approach: "Find the middle with slow/fast pointers, reverse the second half, then merge the two halves by alternating nodes.",
    starter: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef reorder_list(head):\n    # your code here\n    pass\n",
    solution: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef reorder_list(head):\n    if not head or not head.next:\n        return head\n    slow, fast = head, head\n    while fast.next and fast.next.next:\n        slow = slow.next\n        fast = fast.next.next\n    second = slow.next\n    slow.next = None\n    prev = None\n    while second:\n        nxt = second.next\n        second.next = prev\n        prev = second\n        second = nxt\n    first, second = head, prev\n    while second:\n        n1, n2 = first.next, second.next\n        first.next = second\n        second.next = n1\n        first, second = n1, n2\n    return head\n\ndef to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\ndef from_list(vals):\n    head = None\n    for v in reversed(vals):\n        head = ListNode(v, head)\n    return head\n",
    complexity: "O(n) time, O(1) extra space.",
    whyComplexity: "Time is O(n) because finding the middle, reversing the second half, and merging are each a single O(n) pass; space is O(1) extra since all pointer rewiring happens in place.",
    tests: [{ call: "to_list(reorder_list(from_list([1,2,3,4])))", expected: "[1, 4, 2, 3]" }]
  },

  // ---------------- Matrix ----------------
  {
    id: "b75-46", title: "Set Matrix Zeroes", category: "Matrix",
    prompt: "Given an m x n matrix, if an element is 0, set its entire row and column to 0, in place, using O(1) extra space.",
    example: "Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]\nOutput: [[1,0,1],[0,0,0],[1,0,1]]",
    approach: "Use the first row and first column themselves as markers for which rows/columns need zeroing, tracking separately whether the first row/column originally contained a zero.",
    starter: "def set_zeroes(matrix):\n    # your code here\n    pass\n",
    solution: "def set_zeroes(matrix):\n    rows, cols = len(matrix), len(matrix[0])\n    first_row_zero = any(matrix[0][c] == 0 for c in range(cols))\n    first_col_zero = any(matrix[r][0] == 0 for r in range(rows))\n\n    for r in range(1, rows):\n        for c in range(1, cols):\n            if matrix[r][c] == 0:\n                matrix[r][0] = 0\n                matrix[0][c] = 0\n\n    for r in range(1, rows):\n        for c in range(1, cols):\n            if matrix[r][0] == 0 or matrix[0][c] == 0:\n                matrix[r][c] = 0\n\n    if first_row_zero:\n        for c in range(cols):\n            matrix[0][c] = 0\n    if first_col_zero:\n        for r in range(rows):\n            matrix[r][0] = 0\n    return matrix\n",
    complexity: "O(rows * cols) time, O(1) extra space.",
    whyComplexity: "Time is O(rows * cols) because the grid is scanned a constant number of times; space is O(1) extra because the first row and column double as marker storage instead of a separate set.",
    tests: [{ call: "set_zeroes([[1,1,1],[1,0,1],[1,1,1]])", expected: "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]" }]
  },
  {
    id: "b75-47", title: "Spiral Matrix", category: "Matrix",
    prompt: "Given an m x n matrix, return all its elements in spiral order.",
    example: "Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]",
    approach: "Maintain four shrinking boundaries (top, bottom, left, right) and walk each edge in turn, contracting the boundary after each side.",
    starter: "def spiral_order(matrix):\n    # your code here\n    pass\n",
    solution: "def spiral_order(matrix):\n    result = []\n    if not matrix:\n        return result\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n    while top <= bottom and left <= right:\n        for c in range(left, right + 1):\n            result.append(matrix[top][c])\n        top += 1\n        for r in range(top, bottom + 1):\n            result.append(matrix[r][right])\n        right -= 1\n        if top <= bottom:\n            for c in range(right, left - 1, -1):\n                result.append(matrix[bottom][c])\n            bottom -= 1\n        if left <= right:\n            for r in range(bottom, top - 1, -1):\n                result.append(matrix[r][left])\n            left += 1\n    return result\n",
    complexity: "O(rows * cols) time, O(1) extra space beyond the output.",
    whyComplexity: "Time is O(rows * cols) because each cell is visited and appended to the result exactly once as the boundaries shrink; space is O(1) extra beyond the output list.",
    tests: [{ call: "spiral_order([[1,2,3],[4,5,6],[7,8,9]])", expected: "[1, 2, 3, 6, 9, 8, 7, 4, 5]" }]
  },
  {
    id: "b75-48", title: "Rotate Image", category: "Matrix",
    prompt: "Given an n x n matrix, rotate it 90 degrees clockwise, in place.",
    example: "Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]",
    approach: "Transpose the matrix (swap across the diagonal), then reverse each row — the composition of those two operations is a 90-degree clockwise rotation.",
    starter: "def rotate(matrix):\n    # your code here\n    pass\n",
    solution: "def rotate(matrix):\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i+1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for row in matrix:\n        row.reverse()\n    return matrix\n",
    complexity: "O(n^2) time, O(1) extra space.",
    whyComplexity: "Time is O(n^2) because the transpose and row-reversal each touch every cell once, both linear in the number of cells; space is O(1) extra since rotation happens in place.",
    tests: [{ call: "rotate([[1,2,3],[4,5,6],[7,8,9]])", expected: "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]" }]
  },
  {
    id: "b75-49", title: "Word Search", category: "Matrix",
    prompt: "Given a 2D grid of letters and a word, determine whether the word can be traced through adjacent (horizontally or vertically) cells without reusing a cell.",
    example: "Input: board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = \"ABCCED\"\nOutput: True",
    approach: "Backtracking DFS from every cell: temporarily mark the current cell visited, recurse into all four neighbors for the next character, then restore the cell on the way back out.",
    starter: "def exist(board, word):\n    # your code here\n    pass\n",
    solution: "def exist(board, word):\n    rows, cols = len(board), len(board[0])\n\n    def dfs(r, c, i):\n        if i == len(word):\n            return True\n        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[i]:\n            return False\n        temp = board[r][c]\n        board[r][c] = '#'\n        found = (dfs(r+1, c, i+1) or dfs(r-1, c, i+1) or\n                 dfs(r, c+1, i+1) or dfs(r, c-1, i+1))\n        board[r][c] = temp\n        return found\n\n    for r in range(rows):\n        for c in range(cols):\n            if dfs(r, c, 0):\n                return True\n    return False\n",
    complexity: "O(rows * cols * 4^L) worst case for a word of length L.",
    whyComplexity: "Time is O(rows * cols * 4^L) worst case for word length L, since the DFS can branch up to 4 ways at each of L steps from up to rows*cols starting cells; space is O(L) for the recursion depth.",
    tests: [{ call: "exist([['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCCED')", expected: "True" }, { call: "exist([['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCB')", expected: "False" }]
  },

  // ---------------- String ----------------
  {
    id: "b75-50", title: "Longest Substring Without Repeating Characters", category: "String",
    prompt: "Given a string, find the length of the longest substring without repeating characters.",
    example: "Input: s = \"abcabcbb\"\nOutput: 3   (\"abc\")",
    approach: "Sliding window with a hash map of last-seen index per character; move the left edge past the previous occurrence when a repeat enters the window.",
    starter: "def length_of_longest_substring(s):\n    # your code here\n    pass\n",
    solution: "def length_of_longest_substring(s):\n    last_seen = {}\n    left = 0\n    best = 0\n    for right, ch in enumerate(s):\n        if ch in last_seen and last_seen[ch] >= left:\n            left = last_seen[ch] + 1\n        last_seen[ch] = right\n        best = max(best, right - left + 1)\n    return best\n",
    complexity: "O(n) time, O(min(n, alphabet)) space.",
    whyComplexity: "Time is O(n) because each index is visited at most twice as the window slides; space is O(min(n, alphabet size)) for the last-seen-index map.",
    tests: [{ call: "length_of_longest_substring('abcabcbb')", expected: "3" }]
  },
  {
    id: "b75-51", title: "Longest Repeating Character Replacement", category: "String",
    prompt: "Given a string and an integer k, find the length of the longest substring you can get after replacing at most k characters with any other character, such that all characters in it are the same.",
    example: "Input: s = \"ABAB\", k = 2\nOutput: 4",
    approach: "Sliding window tracking the count of the most frequent character in the window. If window size minus that max frequency exceeds k, too many characters would need replacing, so shrink from the left.",
    starter: "def character_replacement(s, k):\n    # your code here\n    pass\n",
    solution: "def character_replacement(s, k):\n    count = {}\n    left = 0\n    max_freq = 0\n    best = 0\n    for right, ch in enumerate(s):\n        count[ch] = count.get(ch, 0) + 1\n        max_freq = max(max_freq, count[ch])\n        while (right - left + 1) - max_freq > k:\n            count[s[left]] -= 1\n            left += 1\n        best = max(best, right - left + 1)\n    return best\n",
    complexity: "O(n) time, O(1) space (bounded alphabet).",
    whyComplexity: "Time is O(n) because both pointers only move forward across the whole run; space is O(1) since the frequency map is bounded by the fixed alphabet size.",
    tests: [{ call: "character_replacement('ABAB', 2)", expected: "4" }, { call: "character_replacement('AABABBA', 1)", expected: "4" }]
  },
  {
    id: "b75-52", title: "Minimum Window Substring", category: "String",
    prompt: "Given strings s and t, find the smallest substring of s that contains every character of t (including duplicates). Return an empty string if no such window exists.",
    example: "Input: s = \"ADOBECODEBANC\", t = \"ABC\"\nOutput: \"BANC\"",
    approach: "Sliding window with a 'need' count map and a 'missing' counter. Expand the right edge until every required character is covered, then contract the left edge as far as possible while it still is, tracking the smallest valid window seen.",
    starter: "def min_window(s, t):\n    # your code here\n    pass\n",
    solution: "def min_window(s, t):\n    if not t or not s:\n        return \"\"\n    need = {}\n    for c in t:\n        need[c] = need.get(c, 0) + 1\n    missing = len(t)\n    left = 0\n    best_left, best_right = 0, 0\n    for right, ch in enumerate(s, 1):\n        if need.get(ch, 0) > 0:\n            missing -= 1\n        need[ch] = need.get(ch, 0) - 1\n        if missing == 0:\n            while left < right and need.get(s[left], 0) < 0:\n                need[s[left]] += 1\n                left += 1\n            if best_right == 0 or right - left < best_right - best_left:\n                best_left, best_right = left, right\n            need[s[left]] += 1\n            missing += 1\n            left += 1\n    return s[best_left:best_right]\n",
    complexity: "O(n + m) time, O(m) space.",
    whyComplexity: "Time is O(n + m) because the right pointer sweeps s once and the left pointer also only moves forward, plus O(m) to build the initial need map; space is O(m) for that map.",
    tests: [{ call: "min_window('ADOBECODEBANC', 'ABC')", expected: "'BANC'" }]
  },
  {
    id: "b75-53", title: "Valid Anagram", category: "String",
    prompt: "Given two strings, determine whether one is an anagram of the other.",
    example: "Input: s = \"anagram\", t = \"nagaram\"\nOutput: True",
    approach: "Count character frequencies in the first string, then decrement while scanning the second; any mismatch or leftover count means it's not an anagram.",
    starter: "def is_anagram(s, t):\n    # your code here\n    pass\n",
    solution: "def is_anagram(s, t):\n    if len(s) != len(t):\n        return False\n    count = {}\n    for c in s:\n        count[c] = count.get(c, 0) + 1\n    for c in t:\n        if c not in count:\n            return False\n        count[c] -= 1\n        if count[c] == 0:\n            del count[c]\n    return len(count) == 0\n",
    complexity: "O(n) time, O(1) space (bounded alphabet).",
    whyComplexity: "Time is O(n) because building and then draining the count map is two linear passes; space is O(1) since the map is bounded by the fixed alphabet size, not the string length.",
    tests: [{ call: "is_anagram('anagram', 'nagaram')", expected: "True" }, { call: "is_anagram('rat', 'cat')", expected: "False" }]
  },
  {
    id: "b75-54", title: "Group Anagrams", category: "String",
    prompt: "Group a list of strings so that all anagrams of each other end up in the same group.",
    example: "Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]",
    approach: "Use each string's sorted characters as a canonical key in a hash map; every anagram sorts to the same key.",
    starter: "def group_anagrams(strs):\n    # your code here\n    pass\n",
    solution: "def group_anagrams(strs):\n    groups = {}\n    for s in strs:\n        key = ''.join(sorted(s))\n        groups.setdefault(key, []).append(s)\n    return list(groups.values())\n",
    complexity: "O(n * k log k) time for n strings of average length k.",
    whyComplexity: "Time is O(n * k log k) because each of n strings of length k is sorted independently; space is O(n * k) for the grouped output.",
    tests: [{ call: "sorted([sorted(g) for g in group_anagrams(['eat','tea','tan','ate','nat','bat'])])", expected: "[['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']]" }]
  },
  {
    id: "b75-55", title: "Valid Parentheses", category: "String",
    prompt: "Given a string of brackets ( ) [ ] { }, determine whether it is validly matched and nested.",
    example: "Input: s = \"([{}])\"\nOutput: True",
    approach: "Push opening brackets onto a stack; on a closing bracket, pop and check it matches the expected opener.",
    starter: "def is_valid(s):\n    # your code here\n    pass\n",
    solution: "def is_valid(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack\n",
    complexity: "O(n) time, O(n) space.",
    whyComplexity: "Time is O(n) because each character is pushed or popped from the stack at most once; space is O(n) worst case if the string is all opening brackets.",
    tests: [{ call: "is_valid('([{}])')", expected: "True" }, { call: "is_valid('([)]')", expected: "False" }]
  },
  {
    id: "b75-56", title: "Valid Palindrome", category: "String",
    prompt: "Given a string, determine whether it is a palindrome after lowercasing and removing all non-alphanumeric characters.",
    example: "Input: s = \"A man, a plan, a canal: Panama\"\nOutput: True",
    approach: "Filter down to lowercase alphanumeric characters, then compare the result to its reverse.",
    starter: "def is_palindrome(s):\n    # your code here\n    pass\n",
    solution: "def is_palindrome(s):\n    filtered = [c.lower() for c in s if c.isalnum()]\n    return filtered == filtered[::-1]\n",
    complexity: "O(n) time, O(n) space.",
    whyComplexity: "Time is O(n) because filtering and reversing are both single linear passes over the string; space is O(n) for the filtered character list.",
    tests: [{ call: "is_palindrome('A man, a plan, a canal: Panama')", expected: "True" }, { call: "is_palindrome('race a car')", expected: "False" }]
  },
  {
    id: "b75-57", title: "Longest Palindromic Substring", category: "String",
    prompt: "Given a string, find its longest palindromic substring.",
    example: "Input: s = \"cbbd\"\nOutput: \"bb\"",
    approach: "Expand around every possible center (once for odd-length palindromes, once for even-length), tracking the widest palindrome found.",
    starter: "def longest_palindrome(s):\n    # your code here\n    pass\n",
    solution: "def longest_palindrome(s):\n    if not s:\n        return \"\"\n    start, end = 0, 0\n    def expand(l, r):\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            l -= 1\n            r += 1\n        return l + 1, r - 1\n    for i in range(len(s)):\n        l1, r1 = expand(i, i)\n        if r1 - l1 > end - start:\n            start, end = l1, r1\n        l2, r2 = expand(i, i+1)\n        if r2 - l2 > end - start:\n            start, end = l2, r2\n    return s[start:end+1]\n",
    complexity: "O(n^2) time, O(1) extra space.",
    whyComplexity: "Time is O(n^2) because there are 2n possible centers and each expansion can walk up to O(n) outward; space is O(1) extra beyond tracking the best start/end indices.",
    tests: [{ call: "longest_palindrome('cbbd')", expected: "'bb'" }]
  },
  {
    id: "b75-58", title: "Palindromic Substrings", category: "String",
    prompt: "Given a string, count how many substrings of it are palindromes (single characters count).",
    example: "Input: s = \"aaa\"\nOutput: 6   (\"a\",\"a\",\"a\",\"aa\",\"aa\",\"aaa\")",
    approach: "Expand around every center (odd and even) and count every successful expansion, since each one is a distinct palindromic substring.",
    starter: "def count_substrings(s):\n    # your code here\n    pass\n",
    solution: "def count_substrings(s):\n    count = 0\n    def expand(l, r):\n        nonlocal count\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            count += 1\n            l -= 1\n            r += 1\n    for i in range(len(s)):\n        expand(i, i)\n        expand(i, i+1)\n    return count\n",
    complexity: "O(n^2) time, O(1) extra space.",
    whyComplexity: "Time is O(n^2) for the same expand-around-center reasoning as Longest Palindromic Substring; space is O(1) extra since only a running count is kept.",
    tests: [{ call: "count_substrings('abc')", expected: "3" }, { call: "count_substrings('aaa')", expected: "6" }]
  },
  {
    id: "b75-59", title: "Encode and Decode Strings", category: "String",
    prompt: "Design an algorithm to encode a list of strings into a single string, and decode it back into the original list of strings, handling strings that contain any characters including delimiters.",
    example: "encode([\"lint\",\"code\",\"love\",\"you\"]) then decode(...) returns the original list.",
    approach: "Length-prefix each string with a delimiter, e.g. '4#lint', so the decoder always knows exactly how many characters to consume next regardless of what those characters are.",
    starter: "def encode(strs):\n    # your code here\n    pass\n\ndef decode(s):\n    pass\n",
    solution: "def encode(strs):\n    return \"\".join(f\"{len(s)}#{s}\" for s in strs)\n\ndef decode(s):\n    result = []\n    i = 0\n    while i < len(s):\n        j = i\n        while s[j] != '#':\n            j += 1\n        length = int(s[i:j])\n        result.append(s[j+1:j+1+length])\n        i = j + 1 + length\n    return result\n",
    complexity: "O(n) time and space for the total character count.",
    whyComplexity: "Time is O(n) for the total character count across all strings, since encoding and decoding each make a single pass; space is O(n) for the encoded string.",
    tests: [{ call: "decode(encode(['lint','code','love','you']))", expected: "['lint', 'code', 'love', 'you']" }]
  },

  // ---------------- Tree ----------------
  {
    id: "b75-60", title: "Maximum Depth of Binary Tree", category: "Tree",
    prompt: "Given a binary tree, find its maximum depth (the number of nodes along the longest path from root to a leaf).",
    example: "Input: root = [3,9,20,null,null,15,7]\nOutput: 3",
    approach: "Recursion: the depth of a tree is 1 plus the greater of its two subtrees' depths.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef max_depth(root):\n    # your code here\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef max_depth(root):\n    if not root:\n        return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))\n",
    complexity: "O(n) time, O(h) recursion stack for height h.",
    whyComplexity: "Time is O(n) because every node is visited exactly once by the recursion; space is O(h) for the recursion stack, where h is tree height (O(log n) balanced, O(n) worst case skewed).",
    tests: [{ call: "max_depth(TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7))))", expected: "3" }]
  },
  {
    id: "b75-61", title: "Same Tree", category: "Tree",
    prompt: "Given the roots of two binary trees, determine whether they are structurally identical with the same node values.",
    example: "Input: p = [1,2,3], q = [1,2,3]\nOutput: True",
    approach: "Recursion: two trees match if both are empty, or both are non-empty with equal values and matching left/right subtrees.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef is_same_tree(p, q):\n    # your code here\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef is_same_tree(p, q):\n    if not p and not q:\n        return True\n    if not p or not q or p.val != q.val:\n        return False\n    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)\n",
    complexity: "O(n) time, O(h) space.",
    whyComplexity: "Time is O(n) because the recursion visits each node of the smaller tree at most once before short-circuiting on a mismatch; space is O(h) for the recursion stack.",
    tests: [{ call: "is_same_tree(TreeNode(1,TreeNode(2),TreeNode(3)), TreeNode(1,TreeNode(2),TreeNode(3)))", expected: "True" }]
  },
  {
    id: "b75-62", title: "Invert Binary Tree", category: "Tree",
    prompt: "Given the root of a binary tree, invert it (mirror it left-to-right) and return the root.",
    example: "Input: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]",
    approach: "Recursion: swap a node's left and right children, after (or while) recursively inverting each subtree.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef invert_tree(root):\n    # your code here\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef invert_tree(root):\n    if not root:\n        return None\n    root.left, root.right = invert_tree(root.right), invert_tree(root.left)\n    return root\n\ndef to_list_level_order(root):\n    from collections import deque\n    if not root:\n        return []\n    out, q = [], deque([root])\n    while q:\n        node = q.popleft()\n        if node:\n            out.append(node.val)\n            q.append(node.left)\n            q.append(node.right)\n        else:\n            out.append(None)\n    while out and out[-1] is None:\n        out.pop()\n    return out\n",
    complexity: "O(n) time, O(h) space.",
    whyComplexity: "Time is O(n) because every node's children are swapped exactly once; space is O(h) for the recursion stack.",
    tests: [{ call: "to_list_level_order(invert_tree(TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7, TreeNode(6), TreeNode(9)))))", expected: "[4, 7, 2, 9, 6, 3, 1]" }]
  },
  {
    id: "b75-63", title: "Binary Tree Maximum Path Sum", category: "Tree",
    prompt: "Given a binary tree, find the maximum sum of any path (a path may start and end at any nodes, and doesn't have to pass through the root).",
    example: "Input: root = [-10,9,20,null,null,15,7]\nOutput: 42   (15 -> 20 -> 7)",
    approach: "Post-order recursion returning the best single-branch sum extending upward from each node, while tracking a global best that allows joining both children through the current node.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef max_path_sum(root):\n    # your code here\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef max_path_sum(root):\n    best = [float('-inf')]\n    def dfs(node):\n        if not node:\n            return 0\n        left = max(dfs(node.left), 0)\n        right = max(dfs(node.right), 0)\n        best[0] = max(best[0], node.val + left + right)\n        return node.val + max(left, right)\n    dfs(root)\n    return best[0]\n",
    complexity: "O(n) time, O(h) space.",
    whyComplexity: "Time is O(n) because the post-order recursion visits and returns from each node exactly once; space is O(h) for the recursion stack.",
    tests: [{ call: "max_path_sum(TreeNode(-10, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7))))", expected: "42" }]
  },
  {
    id: "b75-64", title: "Binary Tree Level Order Traversal", category: "Tree",
    prompt: "Return the values of a binary tree grouped by level, using breadth-first search.",
    example: "Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]",
    approach: "Standard BFS with a queue, processing one full level at a time by tracking the queue length at the start of each level.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef level_order(root):\n    # your code here\n    pass\n",
    solution: "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef level_order(root):\n    if not root:\n        return []\n    result, queue = [], deque([root])\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n        result.append(level)\n    return result\n",
    complexity: "O(n) time, O(n) space.",
    whyComplexity: "Time is O(n) because every node is enqueued and dequeued exactly once; space is O(n) worst case for a wide tree.",
    tests: [{ call: "level_order(TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7))))", expected: "[[3], [9, 20], [15, 7]]" }]
  },
  {
    id: "b75-65", title: "Serialize and Deserialize Binary Tree", category: "Tree",
    prompt: "Design an algorithm to serialize a binary tree to a string and deserialize that string back into the original tree structure.",
    example: "serialize(root) then deserialize(...) reconstructs a tree with the same preorder traversal.",
    approach: "Preorder DFS, writing a sentinel for every None child. Deserializing walks the same token stream in the same order, so the recursive structure reconstructs itself.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef serialize(root):\n    # your code here\n    pass\n\ndef deserialize(data):\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef serialize(root):\n    vals = []\n    def dfs(node):\n        if not node:\n            vals.append('#')\n            return\n        vals.append(str(node.val))\n        dfs(node.left)\n        dfs(node.right)\n    dfs(root)\n    return ','.join(vals)\n\ndef deserialize(data):\n    vals = iter(data.split(','))\n    def dfs():\n        val = next(vals)\n        if val == '#':\n            return None\n        node = TreeNode(int(val))\n        node.left = dfs()\n        node.right = dfs()\n        return node\n    return dfs()\n\ndef preorder(root):\n    if not root:\n        return []\n    return [root.val] + preorder(root.left) + preorder(root.right)\n",
    complexity: "O(n) time and space.",
    whyComplexity: "Time is O(n) because both serialize and deserialize make one traversal visiting every node (or null marker) exactly once; space is O(n) for the token list/string plus O(h) recursion depth.",
    tests: [{ call: "preorder(deserialize(serialize(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4), TreeNode(5))))))", expected: "[1, 2, 3, 4, 5]" }]
  },
  {
    id: "b75-66", title: "Subtree of Another Tree", category: "Tree",
    prompt: "Given two binary trees, determine whether the second tree is a subtree of the first (a node in the first tree whose subtree exactly matches the second tree).",
    example: "Input: root = [3,4,5,1,2], subRoot = [4,1,2]\nOutput: True",
    approach: "For every node in the main tree, check whether the subtree rooted there is structurally identical to the target using the Same Tree check.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef is_subtree(root, sub_root):\n    # your code here\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef is_same(a, b):\n    if not a and not b:\n        return True\n    if not a or not b or a.val != b.val:\n        return False\n    return is_same(a.left, b.left) and is_same(a.right, b.right)\n\ndef is_subtree(root, sub_root):\n    if not root:\n        return sub_root is None\n    if is_same(root, sub_root):\n        return True\n    return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)\n",
    complexity: "O(m * n) worst case for trees of size m and n.",
    whyComplexity: "Time is O(m * n) worst case because is_subtree can call the O(n)-per-call is_same check once for each of the m nodes in the main tree; space is O(h) for the recursion stack.",
    tests: [{ call: "is_subtree(TreeNode(3, TreeNode(4, TreeNode(1), TreeNode(2)), TreeNode(5)), TreeNode(4, TreeNode(1), TreeNode(2)))", expected: "True" }]
  },
  {
    id: "b75-67", title: "Construct Binary Tree from Preorder and Inorder Traversal", category: "Tree",
    prompt: "Given the preorder and inorder traversal of a binary tree with unique values, reconstruct the tree.",
    example: "Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\nOutput: a tree whose preorder traversal is [3,9,20,15,7]",
    approach: "The first element of preorder is always the root. Find that value's position in inorder — everything to its left is the left subtree, everything to its right is the right subtree — and recurse.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef build_tree(preorder, inorder):\n    # your code here\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef build_tree(preorder, inorder):\n    if not preorder or not inorder:\n        return None\n    root_val = preorder[0]\n    root = TreeNode(root_val)\n    mid = inorder.index(root_val)\n    root.left = build_tree(preorder[1:mid+1], inorder[:mid])\n    root.right = build_tree(preorder[mid+1:], inorder[mid+1:])\n    return root\n\ndef preorder_list(root):\n    if not root:\n        return []\n    return [root.val] + preorder_list(root.left) + preorder_list(root.right)\n",
    complexity: "O(n^2) time worst case (O(n log n) with an index map), O(n) space.",
    whyComplexity: "Time is O(n^2) worst case because inorder.index() is a linear scan repeated for each of the n nodes (improvable to O(n) with a precomputed value-to-index map); space is O(n) for the recursive slices and resulting tree.",
    tests: [{ call: "preorder_list(build_tree([3,9,20,15,7],[9,3,15,20,7]))", expected: "[3, 9, 20, 15, 7]" }]
  },
  {
    id: "b75-68", title: "Validate Binary Search Tree", category: "Tree",
    prompt: "Given a binary tree, determine whether it is a valid binary search tree.",
    example: "Input: root = [5,1,4,null,null,3,6]\nOutput: False",
    approach: "Recursion carrying a valid (low, high) range down from the root; each node must fall strictly within its inherited bounds, and it tightens the bounds passed to its children.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef is_valid_bst(root):\n    # your code here\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef is_valid_bst(root):\n    def validate(node, low, high):\n        if not node:\n            return True\n        if not (low < node.val < high):\n            return False\n        return validate(node.left, low, node.val) and validate(node.right, node.val, high)\n    return validate(root, float('-inf'), float('inf'))\n",
    complexity: "O(n) time, O(h) space.",
    whyComplexity: "Time is O(n) because each node is visited once, checked against its inherited bounds in O(1); space is O(h) for the recursion stack.",
    tests: [{ call: "is_valid_bst(TreeNode(2, TreeNode(1), TreeNode(3)))", expected: "True" }, { call: "is_valid_bst(TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6))))", expected: "False" }]
  },
  {
    id: "b75-69", title: "Kth Smallest Element in a BST", category: "Tree",
    prompt: "Given the root of a binary search tree, find the kth smallest value in it.",
    example: "Input: root = [3,1,4,null,2], k = 1\nOutput: 1",
    approach: "An inorder traversal of a BST visits values in sorted order, so an iterative inorder traversal that stops after k visits gives the answer directly.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef kth_smallest(root, k):\n    # your code here\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef kth_smallest(root, k):\n    stack = []\n    node = root\n    while stack or node:\n        while node:\n            stack.append(node)\n            node = node.left\n        node = stack.pop()\n        k -= 1\n        if k == 0:\n            return node.val\n        node = node.right\n",
    complexity: "O(h + k) time, O(h) space.",
    whyComplexity: "Time is O(h + k) because the iterative inorder walk descends to the leftmost node in O(h) then visits k nodes before stopping; space is O(h) for the explicit stack.",
    tests: [{ call: "kth_smallest(TreeNode(3, TreeNode(1, None, TreeNode(2)), TreeNode(4)), 1)", expected: "1" }]
  },
  {
    id: "b75-70", title: "Lowest Common Ancestor of a BST", category: "Tree",
    prompt: "Given a binary search tree and two of its nodes, find their lowest common ancestor.",
    example: "Input: root = [6,2,8,0,4,7,9], p = 2, q = 8\nOutput: 6",
    approach: "Walk down from the root: if both target values are less than the current node, go left; if both are greater, go right; otherwise the current node is the split point, and the answer.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef lowest_common_ancestor(root, p, q):\n    # your code here\n    pass\n",
    solution: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef lowest_common_ancestor(root, p, q):\n    node = root\n    while node:\n        if p.val < node.val and q.val < node.val:\n            node = node.left\n        elif p.val > node.val and q.val > node.val:\n            node = node.right\n        else:\n            return node\n",
    complexity: "O(h) time, O(1) space.",
    whyComplexity: "Time is O(h) because the BST property lets each step discard one whole subtree without exploring it, unlike a general-tree LCA; space is O(1) since it's an iterative walk, not recursion.",
    tests: [{ call: "lowest_common_ancestor(TreeNode(6, TreeNode(2, TreeNode(0), TreeNode(4, TreeNode(3), TreeNode(5))), TreeNode(8, TreeNode(7), TreeNode(9))), TreeNode(2), TreeNode(8)).val", expected: "6" }]
  },
  {
    id: "b75-71", title: "Implement Trie (Prefix Tree)", category: "Tree",
    prompt: "Implement a trie with insert, search (exact word), and starts_with (prefix) operations.",
    example: "insert('apple'); search('apple') -> True; search('app') -> False; starts_with('app') -> True",
    approach: "Each node is a dict of character to child node, plus an end-of-word flag. Insert walks/creates nodes character by character; search and starts_with both walk the same path, differing only in whether the end-of-word flag must be set.",
    starter: "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        pass\n\n    def search(self, word):\n        pass\n\n    def starts_with(self, prefix):\n        pass\n",
    solution: "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for c in word:\n            if c not in node.children:\n                node.children[c] = TrieNode()\n            node = node.children[c]\n        node.is_end = True\n\n    def search(self, word):\n        node = self._find(word)\n        return node is not None and node.is_end\n\n    def starts_with(self, prefix):\n        return self._find(prefix) is not None\n\n    def _find(self, word):\n        node = self.root\n        for c in word:\n            if c not in node.children:\n                return None\n            node = node.children[c]\n        return node\n",
    complexity: "O(L) time per operation for word length L.",
    whyComplexity: "Time is O(L) per operation for a word/prefix of length L, since each character does one O(1) dict lookup/insert down the trie; space is O(total characters inserted), shared where prefixes overlap.",
    tests: [{ call: "(lambda t: (t.insert('apple'), [t.search('apple'), t.search('app'), t.starts_with('app')])[1])(Trie())", expected: "[True, False, True]" }]
  },
  {
    id: "b75-72", title: "Add and Search Word", category: "Tree",
    prompt: "Design a data structure that supports adding words and searching for a word where '.' can match any single character.",
    example: "add_word('bad'); search('.ad') -> True; search('b..') -> True",
    approach: "A trie where search recurses: a literal character follows one child, while '.' branches into every child at that level.",
    starter: "class WordDictionary:\n    def __init__(self):\n        self.root = {}\n\n    def add_word(self, word):\n        pass\n\n    def search(self, word):\n        pass\n",
    solution: "class WordDictionary:\n    def __init__(self):\n        self.root = {}\n\n    def add_word(self, word):\n        node = self.root\n        for c in word:\n            node = node.setdefault(c, {})\n        node['$'] = True\n\n    def search(self, word):\n        def dfs(node, i):\n            if i == len(word):\n                return '$' in node\n            c = word[i]\n            if c == '.':\n                return any(dfs(child, i+1) for k, child in node.items() if k != '$')\n            if c not in node:\n                return False\n            return dfs(node[c], i+1)\n        return dfs(self.root, 0)\n",
    complexity: "O(L) for a literal search, O(26^L) worst case with wildcards.",
    whyComplexity: "Time is O(L) for a literal search but O(26^L) worst case when every character is a wildcard, since each '.' branches into every child; space is O(L) for the recursion depth.",
    tests: [{ call: "(lambda w: (w.add_word('bad'), w.add_word('dad'), w.add_word('mad'), [w.search('pad'), w.search('bad'), w.search('.ad'), w.search('b..')])[3])(WordDictionary())", expected: "[False, True, True, True]" }]
  },
  {
    id: "b75-73", title: "Word Search II", category: "Tree",
    prompt: "Given a 2D grid of letters and a list of words, return every word from the list that can be traced through adjacent cells.",
    example: "Input: board = [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], words = ['oath','pea','eat','rain']\nOutput: ['eat','oath']",
    approach: "Build a trie of all target words, then run one DFS over the grid that walks the trie alongside the grid, so shared prefixes across words are explored only once instead of searching for each word independently.",
    starter: "def find_words(board, words):\n    # your code here\n    pass\n",
    solution: "def find_words(board, words):\n    trie = {}\n    for w in words:\n        node = trie\n        for c in w:\n            node = node.setdefault(c, {})\n        node['$'] = w\n\n    rows, cols = len(board), len(board[0])\n    result = []\n\n    def dfs(r, c, node):\n        ch = board[r][c]\n        if ch not in node:\n            return\n        nxt = node[ch]\n        if '$' in nxt:\n            result.append(nxt['$'])\n            del nxt['$']\n        board[r][c] = '#'\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            nr, nc = r+dr, c+dc\n            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':\n                dfs(nr, nc, nxt)\n        board[r][c] = ch\n\n    for r in range(rows):\n        for c in range(cols):\n            dfs(r, c, trie)\n    return result\n",
    complexity: "O(rows * cols * 4^L) worst case for the longest word length L.",
    whyComplexity: "Time is O(rows * cols * 4^L) worst case for the longest word length L, same branching bound as Word Search, but the shared trie means overlapping prefixes across multiple target words are walked only once instead of once per word; space is O(sum of word lengths) for the trie.",
    tests: [{ call: "sorted(find_words([['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], ['oath','pea','eat','rain']))", expected: "['eat', 'oath']" }]
  },

  // ---------------- Heap ----------------
  {
    id: "b75-74", title: "Top K Frequent Elements", category: "Heap",
    prompt: "Given an array of integers, return the k most frequent elements.",
    example: "Input: nums = [1,1,1,2,2,3], k = 2\nOutput: [1,2]",
    approach: "Count frequencies, then use a heap to pull out the k elements with the largest counts without fully sorting everything.",
    starter: "import heapq\nfrom collections import Counter\n\ndef top_k_frequent(nums, k):\n    # your code here\n    pass\n",
    solution: "import heapq\nfrom collections import Counter\n\ndef top_k_frequent(nums, k):\n    count = Counter(nums)\n    return [x for x, _ in heapq.nlargest(k, count.items(), key=lambda p: p[1])]\n",
    complexity: "O(n log k) time, O(n) space.",
    whyComplexity: "Time is O(n log k) because building the frequency count is O(n), and heapq.nlargest maintains a heap of size k across n items; space is O(n) for the frequency counter.",
    tests: [{ call: "top_k_frequent([1,1,1,2,2,3], 2)", expected: "[1, 2]" }]
  },
  {
    id: "b75-75", title: "Find Median from Data Stream", category: "Heap",
    prompt: "Design a data structure that supports adding numbers one at a time and finding the median of all numbers seen so far, efficiently.",
    example: "add_num(1); add_num(2); find_median() -> 1.5",
    approach: "Maintain two heaps: a max-heap (via negation) for the lower half of the numbers and a min-heap for the upper half, rebalancing after each insert so their sizes never differ by more than one. The median is then either the top of the larger heap, or the average of both tops.",
    starter: "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = []\n        self.large = []\n\n    def add_num(self, num):\n        pass\n\n    def find_median(self):\n        pass\n",
    solution: "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = []  # max-heap, values negated\n        self.large = []  # min-heap\n\n    def add_num(self, num):\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n\n    def find_median(self):\n        if len(self.small) > len(self.large):\n            return float(-self.small[0])\n        return (-self.small[0] + self.large[0]) / 2.0\n",
    complexity: "O(log n) per insert, O(1) per median query.",
    whyComplexity: "Time is O(log n) per insert because each add_num does a constant number of heap push/pop operations; find_median is O(1) since it just reads the heap tops. Space is O(n) to hold every number seen so far across both heaps.",
    tests: [{ call: "(lambda m: (m.add_num(1), m.add_num(2), m.find_median())[2])(MedianFinder())", expected: "1.5" }]
  },
];
