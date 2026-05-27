#!/usr/bin/env python3
"""Static smoke checks for the no-build Solo Learn frontend."""

from html.parser import HTMLParser
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_SCRIPT_ORDER = [
    "scripts/data/foundations.js",
    "scripts/data/practice.js",
    "scripts/data/evolution.js",
    "scripts/app/core.js",
    "scripts/app/runner.js",
    "scripts/app/learning.js",
    "scripts/app/planning.js",
    "scripts/app/render.js",
    "scripts/app/main.js",
]

REQUIRED_STYLESHEETS = [
    "styles/base.css",
    "styles/dashboard.css",
    "styles/study.css",
    "styles/practice-bank.css",
    "styles/runner.css",
    "styles/responsive.css",
]

CRITICAL_FUNCTIONS = [
    "render",
    "renderDailyQueue",
    "renderPracticeBank",
    "renderBlueprint",
    "buildDailyQueue",
    "dailyQueueItemKey",
    "getTodayKey",
    "pruneDailyQueueLog",
    "maybeCompleteDailySession",
    "markDailyQueueItemDone",
    "loadActiveExercise",
    "renderDomPreviewForActiveLesson",
    "evaluateActiveExercise",
    "recordLessonStruggle",
    "relieveLessonStruggle",
    "runStudyCloseoutAction",
]

CRITICAL_EVENT_WIRING = [
    "elements.quickstart.addEventListener",
    "elements.lessonGrid.addEventListener",
    "elements.dailyQueue.addEventListener",
    "elements.challengeForm.addEventListener",
    "elements.practiceBankGrid.addEventListener",
    "elements.practiceBankSpotlight.addEventListener",
    "elements.practiceBankStats.addEventListener",
    "elements.practiceBankPhases.addEventListener",
    "elements.blueprintGrid.addEventListener",
]


class AppHtmlParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts = []
        self.stylesheets = []
        self.ids = set()
        self.classes = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])
        if tag == "link" and attrs.get("rel") == "stylesheet" and attrs.get("href"):
            self.stylesheets.append(attrs["href"])
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if attrs.get("class"):
            self.classes.update(attrs["class"].split())


def read_text(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8")


def is_ordered_subset(required, actual):
    position = 0
    for item in actual:
        if position < len(required) and item == required[position]:
            position += 1
    return position == len(required)


def extract_function_names(paths):
    names = set()
    for path in paths:
        text = read_text(path)
        names.update(re.findall(r"^function\s+([A-Za-z_$][\w$]*)\s*\(", text, flags=re.MULTILINE))
    return names


def extract_element_selectors():
    core = read_text("scripts/app/core.js")
    match = re.search(r"const\s+elements\s*=\s*\{(?P<body>.*?)\n\};", core, flags=re.DOTALL)
    if not match:
        return []

    body = match.group("body")
    selectors = []
    selectors.extend(re.findall(r"document\.querySelector\(\s*[\"']([^\"']+)[\"']\s*\)", body))
    selectors.extend(re.findall(r"document\.querySelectorAll\(\s*[\"']([^\"']+)[\"']\s*\)", body))
    return selectors


def validate_selector(selector, parser):
    if selector.startswith("#"):
        return selector[1:] in parser.ids
    if selector.startswith("."):
        return selector[1:] in parser.classes
    return True


def main():
    failures = []
    html = read_text("index.html")
    parser = AppHtmlParser()
    parser.feed(html)

    for path in [*parser.scripts, *parser.stylesheets]:
        if not (ROOT / path).is_file():
            failures.append(f"Missing referenced file: {path}")

    if "data.js" in parser.scripts or "styles.css" in parser.stylesheets:
        failures.append("index.html still references legacy data.js or styles.css")

    if not is_ordered_subset(REQUIRED_SCRIPT_ORDER, parser.scripts):
        failures.append("Required scripts are missing or loaded in the wrong order")

    missing_stylesheets = [path for path in REQUIRED_STYLESHEETS if path not in parser.stylesheets]
    if missing_stylesheets:
        failures.append(f"Missing stylesheets in index.html: {', '.join(missing_stylesheets)}")

    foundations = read_text("scripts/data/foundations.js")
    practice = read_text("scripts/data/practice.js")
    evolution = read_text("scripts/data/evolution.js")
    if "learningRoot.LEARNING_DATA =" not in foundations:
        failures.append("scripts/data/foundations.js must initialize learningRoot.LEARNING_DATA")
    if "Object.assign(learningRoot.LEARNING_DATA" not in practice:
        failures.append("scripts/data/practice.js must merge into learningRoot.LEARNING_DATA")
    if "Object.assign(learningRoot.LEARNING_DATA" not in evolution:
        failures.append("scripts/data/evolution.js must merge into learningRoot.LEARNING_DATA")

    function_names = extract_function_names(REQUIRED_SCRIPT_ORDER[3:])
    missing_functions = [name for name in CRITICAL_FUNCTIONS if name not in function_names]
    if missing_functions:
        failures.append(f"Missing critical functions: {', '.join(missing_functions)}")

    missing_selectors = [
        selector for selector in extract_element_selectors()
        if not validate_selector(selector, parser)
    ]
    if missing_selectors:
        failures.append(f"Missing DOM targets for scripts/app/core.js elements: {', '.join(missing_selectors)}")

    app_js = read_text("scripts/app/main.js")
    missing_wiring = [snippet for snippet in CRITICAL_EVENT_WIRING if snippet not in app_js]
    if missing_wiring:
        failures.append(f"Missing event wiring: {', '.join(missing_wiring)}")

    if failures:
        print("Smoke check failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Smoke check passed.")
    print(f"- scripts checked: {len(parser.scripts)}")
    print(f"- stylesheets checked: {len(parser.stylesheets)}")
    print(f"- DOM ids checked: {len(parser.ids)}")
    print(f"- critical functions checked: {len(CRITICAL_FUNCTIONS)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
