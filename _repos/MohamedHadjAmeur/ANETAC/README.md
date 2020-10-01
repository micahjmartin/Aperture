"# ANETAC: Arabic Named Entity Transliteration and Classification Dataset\n\n## Description\n\nANETAC is an English-Arabic named entity transliteration and classification dataset (https://arxiv.org/abs/1907.03110) built from freely available parallel translation corpora. The dataset contains 79,924 English-Arabic named entities along with their respective classes that can be either a Person, a Location, or an Organization. \n\nAn example of the instances present in the dataset are provided in the below Table: \n![Cat](https://github.com/MohamedHadjAmeur/ANETC-Arabic-Named-Entity-Transliteration-and-Classification-Dataset/blob/master/image.png)\n\n## CONTENTS\n\n\nThis repository contains two folders:\n* EN-AR NE: which contains the English-Arabic named entities along with their classes as described in the above table.\n* EN-AR Translit: is a benchmark that splits the above-mentioned transliteration data into train, development, and test sets for direct usage in English-Arabic transliteration tasks.\n\nThe count of the Person, Location and Organization named entities that are present in this transliteration dataset are provided in the below Table: \n![Cat](https://github.com/MohamedHadjAmeur/ANETC-Arabic-Named-Entity-Transliteration-and-Classification-Dataset/blob/master/stats.PNG)\n\n## Usage\nWe note that first results using this EN-AR transliteration data (the one in EN-AR Translit folder) has been already published in the work of Hadj Ameur et al. \"Arabic Machine Transliteration using an Attention-based Encoder-decoder Model\".\n\n## Citations\nIf you want to use the ANETAC dataset please cite the following arXiv paper:\n\n\n```\n@article{ameur2019anetac,\n  title={ANETAC: Arabic Named Entity Transliteration and Classification Dataset},\n  author={Ameur, Mohamed Seghir Hadj and Meziane, Farid and Guessoum, Ahmed},\n  journal={arXiv preprint arXiv:1907.03110},\n  year={2019}\n}\n```\n\n## Baseline Results\n\nThe baseline results that have been obtained when using ANETAC are reported in the following publication (you are welcomed to compare your own results to our baseline transliteration models):\n\n```\n@article{HADJAMEUR2017287,\ntitle = \"Arabic Machine Transliteration using an Attention-based Encoder-decoder Model\",\njournal = \"Procedia Computer Science\",\nvolume = \"117\",\npages = \"287 - 297\",\nyear = \"2017\",\nnote = \"Arabic Computational Linguistics\",\nissn = \"1877-0509\",\ndoi = \"https://doi.org/10.1016/j.procs.2017.10.120\",\nurl = \"http://www.sciencedirect.com/science/article/pii/S1877050917321774\",\nauthor = \"Mohamed Seghir Hadj Ameur and Farid Meziane and Ahmed Guessoum\",\nkeywords = \"Natural Language Processing, Arabic Language, Arabic Transliteration, Deep Learning, Sequence-to-sequence Models, Encoder-decoder Architecture, Recurrent Neural Networks\",\nabstract = \"Transliteration is the process of converting words from a given source language alphabet to a target language alphabet, in a way that best preserves the phonetic and orthographic aspects of the transliterated words. Even though an important effort has been made towards improving this process for many languages such as English, French and Chinese, little research work has been accomplished with regard to the Arabic language. In this work, an attention-based encoder-decoder system is proposed for the task of Machine Transliteration between the Arabic and English languages. Our experiments proved the efficiency of our proposal approach in comparison to some previous research developed in this area.\"\n}\n```\n\n## Contacts:\nFor all questions please contact ``mohamedhadjameur@gmail.com`` \n\n"