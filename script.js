// FIFO Algorithm
function fifo(pages, frames) {
    let memory = [];
    let pageFaults = 0;
    let result = [];

    for (let i = 0; i < pages.length; i++) {
        if (!memory.includes(pages[i])) {
            if (memory.length < frames) {
                memory.push(pages[i]);
            } else {
                memory.shift(); // Remove the first element (FIFO)
                memory.push(pages[i]);
            }
            pageFaults++;
        }
        result.push([...memory]);
    }

    return { result, pageFaults };
}

// OPT Algorithm
function opt(pages, frames) {
    let memory = [];
    let pageFaults = 0;
    let result = [];

    for (let i = 0; i < pages.length; i++) {
        if (!memory.includes(pages[i])) {
            if (memory.length < frames) {
                memory.push(pages[i]);
            } else {
                let farthestUse = -1;
                let pageToReplace = -1;

                for (let j = 0; j < memory.length; j++) {
                    let nextUse = pages.slice(i + 1).indexOf(memory[j]);

                    if (nextUse === -1) {
                        pageToReplace = j;
                        break;
                    } else if (nextUse > farthestUse) {
                        farthestUse = nextUse;
                        pageToReplace = j;
                    }
                }

                memory[pageToReplace] = pages[i];
            }
            pageFaults++;
        }
        result.push([...memory]);
    }

    return { result, pageFaults };
}

// LRU Algorithm
function lru(pages, frames) {
    let memory = [];
    let pageFaults = 0;
    let result = [];

    for (let i = 0; i < pages.length; i++) {
        let pageIndex = memory.indexOf(pages[i]);

        if (pageIndex === -1) {
            if (memory.length < frames) {
                memory.push(pages[i]);
            } else {
                memory.shift(); // Remove the least recently used page
                memory.push(pages[i]);
            }
            pageFaults++;
        } else {
            memory.splice(pageIndex, 1); // Remove and add it to the end to mark as recently used
            memory.push(pages[i]);
        }
        result.push([...memory]);
    }

    return { result, pageFaults };
}

// Event listener for the Run button
document.getElementById('run').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm').value;
    const frameCount = parseInt(document.getElementById('frameCount').value);
    const pagesInput = document.getElementById('pages').value.split(',').map(Number);

    let result, pageFaults;

    // Select the algorithm based on user input
    if (algorithm === 'fifo') {
        ({ result, pageFaults } = fifo(pagesInput, frameCount));
    } else if (algorithm === 'opt') {
        ({ result, pageFaults } = opt(pagesInput, frameCount));
    } else if (algorithm === 'lru') {
        ({ result, pageFaults } = lru(pagesInput, frameCount));
    }

    // Display result
    let resultText = `Số Lỗi Trang: ${pageFaults}\n\nCác Khung Bộ Nhớ:\n`;

    result.forEach((state, index) => {
        resultText += `Bước ${index + 1}: [${state.join(', ')}]\n`;
    });

    document.getElementById('result').textContent = resultText;
});
